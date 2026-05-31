<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectComment extends Model
{
    protected $fillable = ['assignment_id', 'user_id', 'message', 'attachment'];

    public function assignment()
    {
        return $this->belongsTo(ProjectAssignment::class, 'assignment_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
