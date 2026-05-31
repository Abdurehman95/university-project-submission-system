<?php

namespace App\Services;

use App\Models\Submission;
use Illuminate\Support\Facades\Log;

class AutograderService
{
    public function gradeSubmission(Submission $submission)
    {
        Log::info("Starting autograding for submission: " . $submission->id);

        // In a real system, this would:
        // 1. Download the submission files.
        // 2. Setup a secure Docker container.
        // 3. Run the instructor's test suite.
        // 4. Capture output and score.

        // Mock Logic:
        $score = rand(60, 100);
        $feedback = "Automated tests passed with some warnings. Score: {$score}/100.";

        return [
            'score' => $score,
            'feedback' => $feedback,
            'passed' => $score >= 70
        ];
    }
}
