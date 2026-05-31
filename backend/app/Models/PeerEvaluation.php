<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeerEvaluation extends Model
{
    protected $fillable = ['assignment_id', 'evaluator_id', 'evaluatee_id', 'rating', 'feedback'];

    public function evaluator()
    {
        return $this->belongsTo(User::class, 'evaluator_id');
    }

    public function evaluatee()
    {
        return $this->belongsTo(User::class, 'evaluatee_id');
    }

    public function assignment()
    {
        return $this->belongsTo(ProjectAssignment::class);
    }
}
