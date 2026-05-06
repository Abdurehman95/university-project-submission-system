<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'objectives', 'requirements', 
        'deliverables', 'deadline', 'category_id', 
        'instructor_id', 'session_id', 'is_group_project'
    ];

    public function category()
    {
        return $this->belongsTo(ProjectCategory::class, 'category_id');
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function session()
    {
        return $this->belongsTo(AcademicSession::class, 'session_id');
    }

    public function groups()
    {
        return $this->hasMany(ProjectGroup::class);
    }

    public function assignments()
    {
        return $this->hasMany(ProjectAssignment::class);
    }
}
