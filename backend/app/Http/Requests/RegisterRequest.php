<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

/**
 * RegisterRequest
 *
 * Centralized server-side validation for the register endpoint.
 * Mitigates:
 *   - Plain-text passwords: enforces strong password policy via Password rule.
 *   - SQL Injection: uses typed, validated inputs only (Eloquent ORM).
 *   - Missing input validation / Malicious data submission.
 */
class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'max:255', 'regex:/^[\pL\s\-]+$/u'],
            'email'         => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password'      => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(), // checks HaveIBeenPwned.com
            ],
            'role_id'       => ['required', 'integer', 'exists:roles,id'],
            'department_id' => ['nullable', 'integer', 'exists:departments,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex'             => 'Name may only contain letters, spaces, and hyphens.',
            'email.unique'           => 'This email is already registered.',
            'password.confirmed'     => 'Password confirmation does not match.',
            'role_id.exists'         => 'The selected role is invalid.',
            'department_id.exists'   => 'The selected department is invalid.',
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
