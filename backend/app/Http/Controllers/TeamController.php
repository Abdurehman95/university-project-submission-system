<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectGroup;
use App\Models\GroupMember;
use App\Models\ProjectAssignment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    public function createTeam(Request $request, $projectId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $project = Project::findOrFail($projectId);
        
        if (!$project->is_group_project) {
            return response()->json(['message' => 'This project does not allow group submissions.'], 400);
        }

        // Check if user is already in a team for this project
        $exists = GroupMember::whereHas('group', function($q) use ($projectId) {
            $q->where('project_id', $projectId);
        })->where('student_id', Auth::id())->exists();

        if ($exists) {
            return response()->json(['message' => 'You are already a member of a team for this project.'], 400);
        }

        $group = ProjectGroup::create([
            'name' => $request->name,
            'project_id' => $projectId,
        ]);

        // Creator becomes the leader by default
        GroupMember::create([
            'group_id' => $group->id,
            'student_id' => Auth::id(),
            'is_leader' => true,
            'role' => 'Team Leader'
        ]);

        return response()->json($group->load('members.student'), 201);
    }

    public function inviteMember(Request $request, $groupId)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'role' => 'nullable|string'
        ]);

        $group = ProjectGroup::findOrFail($groupId);
        
        // Only leader can invite
        $isLeader = GroupMember::where('group_id', $groupId)
            ->where('student_id', Auth::id())
            ->where('is_leader', true)
            ->exists();

        if (!$isLeader) {
            return response()->json(['message' => 'Only the team leader can invite members.'], 403);
        }

        $user = User::where('email', $request->email)->first();

        // Check if already in this group
        if ($group->members()->where('student_id', $user->id)->exists()) {
            return response()->json(['message' => 'User is already in this team.'], 400);
        }

        // Check if already in another team for the same project
        $alreadyInTeam = GroupMember::whereHas('group', function($q) use ($group) {
            $q->where('project_id', $group->project_id);
        })->where('student_id', $user->id)->exists();

        if ($alreadyInTeam) {
            return response()->json(['message' => 'User is already in another team for this project.'], 400);
        }

        $member = GroupMember::create([
            'group_id' => $group->id,
            'student_id' => $user->id,
            'is_leader' => false,
            'role' => $request->role ?? 'Contributor'
        ]);

        // TODO: Send notification/email to the invited student

        return response()->json($member->load('student'), 201);
    }

    public function getTeam($projectId)
    {
        $group = ProjectGroup::where('project_id', $projectId)
            ->whereHas('members', function($q) {
                $q->where('student_id', Auth::id());
            })
            ->with('members.student')
            ->first();

        if (!$group) {
            return response()->json(['message' => 'No team found for this project.'], 404);
        }

        return response()->json($group);
    }

    public function submitEvaluation(Request $request, $assignmentId)
    {
        $request->validate([
            'evaluatee_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'feedback' => 'nullable|string'
        ]);

        $assignment = ProjectAssignment::findOrFail($assignmentId);
        
        // Check if evaluator and evaluatee are in the same team
        $evaluatorId = Auth::id();
        $evaluateeId = $request->evaluatee_id;

        if ($evaluatorId === $evaluateeId) {
            return response()->json(['message' => 'You cannot evaluate yourself.'], 400);
        }

        $sameTeam = GroupMember::where('group_id', $assignment->group_id)
            ->whereIn('student_id', [$evaluatorId, $evaluateeId])
            ->count() === 2;

        if (!$sameTeam) {
            return response()->json(['message' => 'Evaluator and evaluatee must be in the same team.'], 403);
        }

        $evaluation = \App\Models\PeerEvaluation::updateOrCreate(
            ['assignment_id' => $assignmentId, 'evaluator_id' => $evaluatorId, 'evaluatee_id' => $evaluateeId],
            ['rating' => $request->rating, 'feedback' => $request->feedback]
        );

        return response()->json($evaluation, 201);
    }
}
