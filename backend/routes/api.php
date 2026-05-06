<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/login', function (\Illuminate\Http\Request $request) {
    $path = $request->fullUrl();
    $role = 'User';
    $email = 'user@example.com';

    if (str_contains($path, 'admin')) {
        $role = 'Administrator';
        $email = 'admin@example.com';
    } elseif (str_contains($path, 'instructor')) {
        $role = 'Instructor';
        $email = 'instructor@example.com';
    } elseif (str_contains($path, 'student')) {
        $role = 'Student';
        $email = 'student@example.com';
    }

    return response()->json([
        'status' => 'error',
        'error' => 'Authentication Required',
        'role_required' => $role,
        'message' => "You must be logged in as a {$role} to access this resource.",
        'hint' => "Please POST {$role} credentials to the login endpoint to receive a token.",
        'auth_guide' => [
            'endpoint' => url('/api/login'),
            'method' => 'POST',
            'body_format' => [
                'email' => $email,
                'password' => 'password'
            ],
            'header_required' => 'Authorization: Bearer <your_token>'
        ]
    ], 401);
})->name('login');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    Route::get('/departments', [DepartmentController::class, 'index']);
    Route::get('/project-categories', [ProjectCategoryController::class, 'index']);

    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'getStats']);
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::post('/users', [AdminController::class, 'createUser']);
        Route::get('/logs', [AdminController::class, 'getLogs']);
        Route::get('/departments', [AdminController::class, 'getDepartmentsWithStats']);
        Route::get('/report-data', [AdminController::class, 'getReportData']);
    });

    // Instructor Routes
    Route::prefix('instructor')->group(function () {
        Route::get('/stats', [InstructorController::class, 'getStats']);
        Route::get('/projects', [InstructorController::class, 'getProjects']);
        Route::post('/projects', [InstructorController::class, 'createProject']);
        Route::get('/submissions', [InstructorController::class, 'getSubmissions']);
        Route::post('/submissions/{id}/evaluate', [InstructorController::class, 'evaluateSubmission']);
        Route::post('/submissions/{id}/revision', [InstructorController::class, 'requestRevision']);
    });

    // Student Routes
    Route::prefix('student')->group(function () {
        Route::get('/stats', [StudentController::class, 'getDashboardStats']);
        Route::get('/assignments', [StudentController::class, 'getAssignments']);
        Route::get('/available-projects', [StudentController::class, 'getAvailableProjects']);
        Route::post('/projects/{id}/join', [StudentController::class, 'joinProject']);
        Route::post('/assignments/{id}/submit', [StudentController::class, 'submitProject']);
        Route::get('/grades', [StudentController::class, 'getGrades']);
        Route::get('/revisions', [StudentController::class, 'getRevisions']);
    });
});
