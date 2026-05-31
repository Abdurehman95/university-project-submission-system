<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user.
     * Uses RegisterRequest for strong password + input validation.
     * Mitigates: Plain-text passwords, SQL Injection, Missing input validation.
     */
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name'          => $validated['name'],
            'email'         => $validated['email'],
            'password'      => Hash::make($validated['password']), // bcrypt hashed
            'role_id'       => $validated['role_id'],
            'department_id' => $validated['department_id'] ?? null,
        ]);

        AuditLog::create([
            'user_id'   => $user->id,
            'action'    => 'User Registered',
            'entity'    => 'User',
            'entity_id' => $user->id,
            'level'     => 'Info',
        ]);

        return response()->json([
            'message' => 'User registered successfully. Please login.',
            'user'    => $user->load('role', 'department'),
        ], 201);
    }

    /**
     * Authenticate and issue a Sanctum token.
     * Uses LoginRequest for input validation.
     * Token expires after 24 hours.
     * Mitigates: Weak authentication, Brute-force (combined with RateLimitMiddleware on route).
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            // Log failed attempt
            AuditLog::create([
                'user_id'   => null,
                'action'    => 'Failed Login Attempt',
                'entity'    => 'Auth',
                'entity_id' => null,
                'level'     => 'Warning',
            ]);

            return response()->json([
                'error'   => 'Authentication Failed',
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        // Revoke old tokens to prevent token accumulation
        $user->tokens()->delete();

        // Issue token with 24-hour expiry
        $token = $user->createToken(
            'auth_token',
            ['*'],
            now()->addHours(24)
        )->plainTextToken;

        AuditLog::create([
            'user_id'   => $user->id,
            'action'    => 'User Logged In',
            'entity'    => 'Auth',
            'entity_id' => $user->id,
            'level'     => 'Info',
        ]);

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'expires_in'   => 86400, // 24 hours in seconds
            'user'         => $user->load('role', 'department'),
        ]);
    }

    /**
     * Revoke the current access token (logout).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        AuditLog::create([
            'user_id'   => $request->user()->id,
            'action'    => 'User Logged Out',
            'entity'    => 'Auth',
            'entity_id' => $request->user()->id,
            'level'     => 'Info',
        ]);

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /**
     * Return the authenticated user's profile.
     */
    public function me(Request $request)
    {
        return response()->json($request->user()->load('role', 'department'));
    }
}
