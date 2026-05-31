<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * LoginRequest
 *
 * Centralized server-side validation for login endpoint.
 * Mitigates: SQL Injection (via type-safe validation), Missing input validation,
 *            Malicious data submission.
 */
class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Auth check is handled by the controller logic
    }

    public function rules(): array
    {
        return [
            'email'    => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'max:128'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'    => 'Email address is required.',
            'email.email'       => 'Please provide a valid email address.',
            'password.required' => 'Password is required.',
            'password.min'      => 'Password must be at least 8 characters.',
        ];
    }

    /**
     * Return JSON error response instead of Laravel default redirect.
     */
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
