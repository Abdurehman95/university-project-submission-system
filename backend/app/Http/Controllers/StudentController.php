<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectAssignment;
use App\Models\Submission;
use App\Models\SubmissionFile;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    public function getDashboardStats()
    {
        $studentId = auth()->id();
        $assignedProjects = ProjectAssignment::where('student_id', $studentId)->count();
        $completedProjects = Submission::whereHas('assignment', function ($q) use ($studentId) {
            $q->where('student_id', $studentId);
        })->where('status', 'Graded')->count();

        $pendingProjects = ProjectAssignment::where('student_id', $studentId)
            ->whereDoesntHave('submissions')
            ->count();

        return response()->json([
            'stats' => [
                ['title' => 'Assigned Projects', 'value' => $assignedProjects, 'color' => '#6366f1'],
                ['title' => 'Completed Projects', 'value' => $completedProjects, 'color' => '#10b981'],
                ['title' => 'Pending Submissions', 'value' => $pendingProjects, 'color' => '#f59e0b'],
                ['title' => 'Overall Grade', 'value' => 'N/A', 'color' => '#ec4899'] // Complex calculation, mocked for now
            ]
        ]);
    }

    public function getAssignments()
    {
        $assignments = ProjectAssignment::with(['project.category', 'project.instructor', 'submissions'])
            ->where('student_id', auth()->id())
            ->get()->map(function ($assignment) {
                
                $latestSubmission = $assignment->submissions->sortByDesc('created_at')->first();
                $status = $latestSubmission ? $latestSubmission->status : 'Pending Submission';
                
                return [
                    'id' => $assignment->id,
                    'project_title' => $assignment->project->title,
                    'category' => $assignment->project->category->name ?? 'N/A',
                    'instructor' => $assignment->project->instructor->name ?? 'N/A',
                    'deadline' => $assignment->project->deadline,
                    'description' => $assignment->project->description,
                    'status' => $status,
                    'submission_status' => $status,
                    'assignment_status' => $assignment->status,
                    'has_submission' => $latestSubmission ? true : false,
                ];
            });

        return response()->json($assignments);
    }

    public function submitProject(Request $request, $assignmentId)
    {
        $request->validate([
            'files' => 'nullable|array',
            'files.*' => 'file|max:10240', // 10MB max per file
            'notes' => 'nullable|string'
        ]);

        $assignment = ProjectAssignment::where('id', $assignmentId)
                        ->where('student_id', auth()->id())
                        ->firstOrFail();

        // Check if a submission already exists for this assignment
        $submission = Submission::where('assignment_id', $assignment->id)->first();

        if ($submission) {
            $submission->update(['status' => 'Under Review']);
            // Optionally clear previous files if replacing them
            $submission->files()->delete();
        } else {
            $submission = Submission::create([
                'assignment_id' => $assignment->id,
                'status' => 'Under Review',
            ]);
        }

        // Update assignment status
        $assignment->update(['status' => 'submitted']);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('submissions', 'public');
                SubmissionFile::create([
                    'submission_id' => $submission->id,
                    'file_name' => $file->getClientOriginalName(),
                    'file_url' => $path,
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }

        return response()->json(['message' => 'Project submitted successfully', 'submission' => $submission], 201);
    }

    public function getGrades()
    {
        $submissions = Submission::with(['assignment.project', 'grade', 'reviews'])
            ->whereHas('assignment', function ($q) {
                $q->where('student_id', auth()->id());
            })->where('status', 'Graded')
            ->get()->map(function ($sub) {
                $grade = $sub->grade;
                $review = $sub->reviews->first();
                
                return [
                    'id' => $sub->id,
                    'project_title' => $sub->assignment->project->title,
                    'score' => $grade ? $grade->score : 'N/A',
                    'feedback' => $review ? $review->feedback : 'No feedback',
                    'graded_on' => $grade ? $grade->created_at->format('M d, Y') : 'N/A',
                ];
            });

        return response()->json($submissions);
    }

    public function getRevisions()
    {
        $revisions = Submission::with(['assignment.project', 'reviews'])
            ->whereHas('assignment', function ($q) {
                $q->where('student_id', auth()->id());
            })->where('status', 'Revision Required')
            ->get()->map(function ($sub) {
                $review = $sub->reviews->where('decision', 'revision_required')->first();
                
                return [
                    'id' => $sub->id,
                    'assignment_id' => $sub->assignment_id,
                    'project_title' => $sub->assignment->project->title,
                    'feedback' => $review ? $review->feedback : 'Check requirements',
                    'requested_on' => $sub->updated_at->format('M d, Y'),
                ];
            });

        return response()->json($revisions);
    }

    public function getAvailableProjects()
    {
        $studentId = auth()->id();

        $available = Project::with(['category', 'instructor'])
            ->whereDoesntHave('assignments', function($q) use ($studentId) {
                $q->where('student_id', $studentId);
            })
            ->get()->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'category' => $project->category->name ?? 'N/A',
                    'instructor' => $project->instructor->name ?? 'N/A',
                    'deadline' => $project->deadline,
                    'description' => $project->description,
                ];
            });

        return response()->json($available);
    }

    public function joinProject($projectId)
    {
        $studentId = auth()->id();

        // Check if already assigned
        $exists = ProjectAssignment::where('project_id', $projectId)
            ->where('student_id', $studentId)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already assigned to this project'], 400);
        }

        $project = Project::findOrFail($projectId);

        $assignment = ProjectAssignment::create([
            'project_id' => $projectId,
            'student_id' => $studentId,
            'assigned_by' => $project->instructor_id,
            'status' => 'accepted',
            'assigned_at' => now(),
            'accepted_at' => now(),
        ]);

        return response()->json(['message' => 'Joined project successfully', 'assignment' => $assignment], 201);
    }
}
