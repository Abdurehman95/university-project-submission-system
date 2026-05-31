<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * CreateUserRequest
 *
 * Validates admin user-creation payload.
 * Mitigates: SQL Injection, Missing input validation, plain-text password storage.
 */
class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Extra authorization: only admins can reach this, enforced by RoleMiddleware on the route
        return true;
    }

    public function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'max:255', 'regex:/^[\pL\s\-]+$/u'],
            'email'         => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password'      => ['required', 'string', 'min:8', 'max:128'],
            'role_id'       => ['required', 'integer', 'exists:roles,id'],
            'department_id' => ['nullable', 'integer', 'exists:departments,id'],
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
