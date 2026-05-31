<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * RoleMiddleware
 *
 * Enforces role-based access control (RBAC) on protected routes.
 * Mitigates: Unauthorized access (weak authentication / missing authorization).
 *
 * Usage in routes: ->middleware('role:Administrator')
 *                  ->middleware('role:Instructor,Administrator')
 */
class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'error'   => 'Unauthenticated',
                'message' => 'You must be logged in to access this resource.',
            ], 401);
        }

        // Eager-load role if not already loaded
        if (! $user->relationLoaded('role')) {
            $user->load('role');
        }

        $userRole = $user->role?->name;

        if (! $userRole || ! in_array($userRole, $roles)) {
            return response()->json([
                'error'   => 'Forbidden',
                'message' => "Access denied. Required role(s): " . implode(' or ', $roles) . ".",
            ], 403);
        }

        return $next($request);
    }
}
