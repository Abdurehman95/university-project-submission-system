<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiAssistantService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }

    public function generateAbstract($projectTitle, $requirements)
    {
        $prompt = "Act as an academic assistant. Based on the following project title and requirements, generate a professional 150-word abstract.\n\nTitle: {$projectTitle}\nRequirements: {$requirements}";
        
        return $this->callGemini($prompt);
    }

    public function summarizeReport($content)
    {
        $prompt = "Act as an academic supervisor. Summarize the following project report content into key findings and feedback points.\n\nContent: " . substr($content, 0, 5000); // Limit content length
        
        return $this->callGemini($prompt);
    }

    protected function callGemini($prompt)
    {
        if (!$this->apiKey) {
            return "AI Assistant is currently unavailable (Missing API Key).";
        }

        try {
            $response = Http::post("{$this->baseUrl}?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['candidates'][0]['content']['parts'][0]['text'] ?? "Unable to generate content.";
            }

            Log::error('Gemini API Error: ' . $response->body());
            return "AI Assistant encountered an error.";
        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return "AI Assistant service is offline.";
        }
    }
}
