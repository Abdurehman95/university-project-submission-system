<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * PostCommentRequest
 *
 * Validates discussion comment submission.
 * Mitigates:
 *   - XSS: message is sanitized upstream by SanitizeInputMiddleware + max length.
 *   - Malicious file uploads: attachment whitelisted.
 *   - Missing input validation.
 */
class PostCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'message'    => ['required', 'string', 'min:1', 'max:5000'],
            'attachment' => [
                'nullable',
                'file',
                'max:10240',
                'mimes:pdf,doc,docx,png,jpg,jpeg,zip,txt',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'message.required'     => 'Comment message cannot be empty.',
            'message.max'          => 'Comment must not exceed 5000 characters.',
            'attachment.mimes'     => 'Allowed attachment types: PDF, Word, images, ZIP, TXT.',
            'attachment.max'       => 'Attachment must not exceed 10MB.',
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
