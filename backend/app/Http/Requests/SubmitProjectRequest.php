<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * SubmitProjectRequest
 *
 * Validates student project submission payload.
 * Mitigates:
 *   - Malicious file uploads (restricts MIME types and file size).
 *   - Missing input validation / Malicious data submission.
 *   - XSS via notes field (sanitized by SanitizeInputMiddleware + max length cap).
 */
class SubmitProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'notes'    => ['nullable', 'string', 'max:2000'],
            'files'    => ['nullable', 'array', 'max:5'],        // Max 5 files
            'files.*'  => [
                'file',
                'max:10240',                                      // 10MB per file
                'mimes:pdf,doc,docx,zip,txt,png,jpg,jpeg',       // Whitelist MIME types
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'files.max'       => 'You may upload a maximum of 5 files per submission.',
            'files.*.max'     => 'Each file must not exceed 10MB.',
            'files.*.mimes'   => 'Allowed file types: PDF, Word, ZIP, TXT, PNG, JPG.',
            'notes.max'       => 'Notes may not exceed 2000 characters.',
        ];
    }

    protected function failedValidation(Validator $validator): never
    {
        throw new HttpResponseException(
            response()->json([
                'error'   => 'Validation Failed',
                'message' => 'The provided input is invalid.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
