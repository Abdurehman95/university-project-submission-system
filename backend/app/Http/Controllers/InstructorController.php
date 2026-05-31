<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectAssignment;
use App\Models\Submission;
use App\Models\Grade;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class InstructorController extends Controller
{
    public function getStats()
    {
        $instructorId = auth()->id();
        $activeCourses = Project::where('instructor_id', $instructorId)->count();
        $projectIds = Project::where('instructor_id', $instructorId)->pluck('id');
        $submissionsCount = Submission::whereHas('assignment', function($q) use ($projectIds) {
            $q->whereIn('project_id', $projectIds);
        })->count();
        $pendingReviews = Submission::whereHas('assignment', function($q) use ($projectIds) {
            $q->whereIn('project_id', $projectIds);
        })->where('status', 'Under Review')->count();

        return response()->json([
            'stats' => [
                [
                    'label' => 'Active Projects',
                    'value' => $activeCourses,
                ],
                [
                    'label' => 'Total Submissions',
                    'value' => $submissionsCount,
                ],
                [
                    'label' => 'Pending Review',
                    'value' => $pendingReviews,
                ],
                [
                    'label' => 'Student Avg',
                    'value' => '84%', // We can calculate this if we have grades
                ]
            ]
        ]);
    }

    public function getProjects()
    {
        $projects = Project::where('instructor_id', auth()->id())->with('category')->get()->map(function($project) {
            return [
                'id' => $project->id,
                'name' => $project->title,
                'code' => 'PRJ-' . $project->id,
                'category' => $project->category ? $project->category->name : 'N/A',
                'term' => 'Current',
            ];
        });

        return response()->json($projects);
    }

    public function createProject(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:project_categories,id',
            'description' => 'required|string',
            'deadline' => 'required|date',
        ]);

        $session = \App\Models\AcademicSession::where('is_active', true)->first();
        if (!$session) {
            return response()->json(['message' => 'No active academic session found. Please contact an administrator.'], 400);
        }

        $project = Project::create([
            'title' => $request->title,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'instructor_id' => auth()->id(),
            'session_id' => $session->id,
            'requirements' => $request->description, // Just for mock
            'deadline' => $request->deadline,
        ]);

        return response()->json(['message' => 'Project created successfully', 'project' => $project], 201);
    }

    public function updateProject(Request $request, $id)
    {
        $project = Project::where('instructor_id', auth()->id())->findOrFail($id);
        
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'deadline' => 'date',
        ]);

        $project->update($request->only(['title', 'description', 'deadline']));

        // Log action
        \App\Models\AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'Updated Project: ' . $project->title,
            'entity' => 'Project',
            'entity_id' => $project->id,
            'level' => 'Info'
        ]);

        return response()->json(['message' => 'Project updated successfully', 'project' => $project]);
    }

    public function getSubmissions()
    {
        $projectIds = Project::where('instructor_id', auth()->id())->pluck('id');
        
        $submissions = Submission::with(['assignment.student', 'assignment.project'])
            ->whereHas('assignment', function($q) use ($projectIds) {
                $q->whereIn('project_id', $projectIds);
            })->get()->map(function($sub) {
                return [
                    'id' => $sub->id,
                    'student' => $sub->assignment->student->name ?? 'Unknown',
                    'assignment' => $sub->assignment->project->title ?? 'Unknown',
                    'date' => $sub->created_at->format('M d, Y'),
                    'status' => $sub->status,
                ];
            });

        return response()->json($submissions);
    }

    public function evaluateSubmission(Request $request, $id)
    {
        $request->validate([
            'score' => 'required|numeric|min:0|max:100',
            'comments' => 'nullable|string',
        ]);

        $submission = Submission::findOrFail($id);
        
        $review = Review::create([
            'submission_id' => $submission->id,
            'instructor_id' => $request->user()->id,
            'feedback' => $request->comments,
            'decision' => 'approved',
        ]);

        // Simple grade letter calculation
        $score = $request->score;
        $gradeLetter = 'F';
        if ($score >= 90) $gradeLetter = 'A';
        else if ($score >= 80) $gradeLetter = 'B';
        else if ($score >= 70) $gradeLetter = 'C';
        else if ($score >= 60) $gradeLetter = 'D';

        Grade::create([
            'submission_id' => $submission->id,
            'score' => $score,
            'grade_letter' => $gradeLetter,
            'graded_by' => $request->user()->id,
            'graded_at' => now(),
        ]);

        $submission->update(['status' => 'Graded']);

        // Log action
        \App\Models\AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'Graded Submission',
            'entity' => 'Submission',
            'entity_id' => $submission->id,
            'level' => 'Info'
        ]);

        // Notify Student
        $notification = \App\Models\Notification::create([
            'user_id' => $submission->assignment->student_id,
            'title' => 'Project Graded',
            'message' => "Your submission for '{$submission->assignment->project->title}' has been graded.",
            'type' => 'grade',
        ]);

        broadcast(new \App\Events\NotificationSent($notification))->toOthers();

        return response()->json(['message' => 'Submission evaluated successfully']);
    }

    public function requestRevision(Request $request, $id)
    {
        $request->validate([
            'comments' => 'required|string',
        ]);

        $submission = Submission::findOrFail($id);
        
        Review::create([
            'submission_id' => $submission->id,
            'instructor_id' => $request->user()->id,
            'feedback' => $request->comments,
            'decision' => 'revision_required',
        ]);

        $submission->update(['status' => 'Revision Required']);
        
        // Also update assignment status
        $submission->assignment->update(['status' => 'revision_required']);

        // Log action
        \App\Models\AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'Requested Revision',
            'entity' => 'Submission',
            'entity_id' => $submission->id,
            'level' => 'Warning'
        ]);

        // Notify Student
        $notification = \App\Models\Notification::create([
            'user_id' => $submission->assignment->student_id,
            'title' => 'Revision Requested',
            'message' => "The instructor has requested a revision for '{$submission->assignment->project->title}'.",
            'type' => 'revision',
        ]);

        broadcast(new \App\Events\NotificationSent($notification))->toOthers();

        return response()->json(['message' => 'Revision requested successfully']);
    }
}
