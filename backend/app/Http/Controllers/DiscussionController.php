<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCommentRequest;
use App\Models\ProjectAssignment;
use App\Models\ProjectComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DiscussionController extends Controller
{
    public function getComments($assignmentId)
    {
        $assignment = ProjectAssignment::findOrFail($assignmentId);
        
        // Authorization check
        $this->authorizeAccess($assignment);

        $comments = $assignment->comments()
            ->with('user:id,name,role_id')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($comments);
    }

    public function postComment(PostCommentRequest $request, $assignmentId)
    {

        $assignment = ProjectAssignment::findOrFail($assignmentId);
        
        // Authorization check
        $this->authorizeAccess($assignment);

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('comments', 'public');
        }

        $comment = ProjectComment::create([
            'assignment_id' => $assignment->id,
            'user_id' => Auth::id(),
            'message' => $request->message,
            'attachment' => $attachmentPath,
        ]);

        $comment->load('user:id,name,role_id');

        broadcast(new \App\Events\CommentPosted($comment))->toOthers();

        return response()->json($comment, 201);
    }

    private function authorizeAccess(ProjectAssignment $assignment)
    {
        $user = Auth::user();
        
        if ($user->role->name === 'Administrator') {
            return true;
        }

        if ($user->role->name === 'Instructor') {
            // Instructor must be the one who assigned it or the project owner
            if ($assignment->assigned_by === $user->id || $assignment->project->instructor_id === $user->id) {
                return true;
            }
        }

        if ($user->role->name === 'Student') {
            // Student must be the one assigned or in the group
            if ($assignment->student_id === $user->id) {
                return true;
            }
            if ($assignment->group_id && $assignment->group->members()->where('student_id', $user->id)->exists()) {
                return true;
            }
        }

        abort(403, 'Unauthorized access to this discussion thread.');
    }
}
