<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * SanitizeInputMiddleware
 *
 * Strips dangerous HTML/script tags from all string inputs in the request.
 * Mitigates: XSS (Cross-Site Scripting) via stored/reflected malicious input.
 *
 * Applied globally to all API routes.
 */
class SanitizeInputMiddleware
{
    /**
     * Fields that should NOT be sanitized (e.g., passwords must remain exact).
     */
    protected array $except = ['password', 'password_confirmation', 'current_password'];

    public function handle(Request $request, Closure $next): Response
    {
        $input = $request->all();
        $sanitized = $this->sanitize($input);
        $request->merge($sanitized);

        return $next($request);
    }

    private function sanitize(array $data): array
    {
        foreach ($data as $key => $value) {
            if (in_array($key, $this->except)) {
                continue;
            }

            if (is_string($value)) {
                // Strip HTML tags and encode special characters
                $data[$key] = htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
            } elseif (is_array($value)) {
                $data[$key] = $this->sanitize($value);
            }
        }

        return $data;
    }
}
