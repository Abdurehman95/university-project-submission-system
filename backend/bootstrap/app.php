<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        /*
        |--------------------------------------------------------------
        | Global API Middleware Stack
        | Applied to every request reaching the API router.
        |--------------------------------------------------------------
        */

        // 1. Security headers on every API response
        //    Mitigates: XSS, clickjacking, MIME sniffing, data interception
        $middleware->appendToGroup('api', \App\Http\Middleware\SecurityHeadersMiddleware::class);

        // 2. Sanitize all string inputs (strip tags, encode HTML entities)
        //    Mitigates: Stored/Reflected XSS, Malicious data submission
        $middleware->appendToGroup('api', \App\Http\Middleware\SanitizeInputMiddleware::class);

        /*
        |--------------------------------------------------------------
        | Middleware Aliases (used in route definitions)
        |--------------------------------------------------------------
        */

        // role:Administrator  /  role:Instructor,Administrator  etc.
        // Mitigates: Unauthorized access (RBAC enforcement)
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                $path = $request->path();
                $role = 'User';
                $exampleEmail = 'user@example.com';

                if (str_contains($path, 'admin')) {
                    $role = 'Administrator';
                    $exampleEmail = 'admin@example.com';
                } elseif (str_contains($path, 'instructor')) {
                    $role = 'Instructor';
                    $exampleEmail = 'instructor@example.com';
                } elseif (str_contains($path, 'student')) {
                    $role = 'Student';
                    $exampleEmail = 'student@example.com';
                }

                return response()->json([
                    'status' => 'error',
                    'error' => 'Authentication Required',
                    'role_required' => $role,
                    'message' => "You must be logged in as a {$role} to access this endpoint.",
                    'hint' => "Please authenticate using {$role} credentials at the login endpoint.",
                    'auth_guide' => [
                        'endpoint' => url('/api/login'),
                        'method' => 'POST',
                        'body_format' => [
                            'email' => $exampleEmail,
                            'password' => 'password'
                        ],
                        'header_required' => 'Authorization: Bearer <your_token>'
                    ]
                ], 401);
            }
        });
    })->create();
