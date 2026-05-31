<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('assignment.{id}', function ($user, $id) {
    $assignment = \App\Models\ProjectAssignment::find($id);
    if (!$assignment) return false;

    if ($user->role->name === 'Administrator') return true;

    if ($user->role->name === 'Instructor') {
        return $assignment->assigned_by === $user->id || $assignment->project->instructor_id === $user->id;
    }

    if ($user->role->name === 'Student') {
        if ($assignment->student_id === $user->id) return true;
        if ($assignment->group_id && $assignment->group->members()->where('student_id', $user->id)->exists()) return true;
    }

    return false;
});
