<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'assignment_id', 'version', 'submitted_at', 'is_late', 'status'
    ];

    public function assignment()
    {
        return $this->belongsTo(ProjectAssignment::class, 'assignment_id');
    }

    public function files()
    {
        return $this->hasMany(SubmissionFile::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function grade()
    {
        return $this->hasOne(Grade::class);
    }
}
