<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

/**
 * RateLimitMiddleware
 *
 * Implements per-IP rate limiting for sensitive endpoints (login, register).
 * Mitigates: brute-force attacks, weak authentication exploitation.
 *
 * Default: 10 attempts per 60 seconds per IP.
 */
class RateLimitMiddleware
{
    public function handle(Request $request, Closure $next, int $maxAttempts = 10, int $decayMinutes = 1): Response
    {
        $key = 'rate_limit:' . $request->ip() . ':' . $request->path();

        $attempts = Cache::get($key, 0);

        if ($attempts >= $maxAttempts) {
            return response()->json([
                'error'   => 'Too Many Requests',
                'message' => "Rate limit exceeded. Try again in {$decayMinutes} minute(s).",
            ], 429);
        }

        Cache::put($key, $attempts + 1, now()->addMinutes($decayMinutes));

        return $next($request);
    }
}
