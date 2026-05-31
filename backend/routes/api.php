<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;
use App\Http\Middleware\RateLimitMiddleware;
use Illuminate\Support\Facades\Route;

/*
|----------------------------------------------------------------------
| Public Auth Routes (Rate-Limited)
| Mitigates: Brute-force attacks, Weak authentication
|----------------------------------------------------------------------
*/
Route::middleware([RateLimitMiddleware::class . ':10,1'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Redirect unauthenticated API access with a clear JSON message
Route::get('/login', function () {
    return response()->json([
        'error'   => 'Authentication Required',
        'message' => 'Please POST your credentials to /api/login to receive a token.',
        'endpoint' => url('/api/login'),
    ], 401);
})->name('login');

/*
|----------------------------------------------------------------------
| Authenticated Routes (Sanctum Token Required)
| Mitigates: Weak authentication (all routes require valid Bearer token)
|----------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::get('/departments',       [DepartmentController::class,      'index']);
    Route::get('/project-categories',[ProjectCategoryController::class, 'index']);

    /*
    |------------------------------------------------------------------
    | Admin Routes — Role: Administrator only
    | Mitigates: Unauthorized access (students/instructors blocked)
    |------------------------------------------------------------------
    */
    Route::prefix('admin')
        ->middleware(['role:Administrator'])
        ->group(function () {
            Route::get('/stats',          [AdminController::class, 'getStats']);
            Route::get('/users',          [AdminController::class, 'getUsers']);
            Route::post('/users',         [AdminController::class, 'createUser']);
            Route::get('/logs',           [AdminController::class, 'getLogs']);
            Route::get('/departments',    [AdminController::class, 'getDepartmentsWithStats']);
            Route::get('/report-data',    [AdminController::class, 'getReportData']);
            Route::get('/early-warning',  [AdminController::class, 'getEarlyWarningData']);
            Route::get('/heatmap',        [AdminController::class, 'getDepartmentHeatmap']);
            Route::get('/export-report',  [AdminController::class, 'exportReport']);
        });

    /*
    |------------------------------------------------------------------
    | Instructor Routes — Role: Instructor or Administrator
    | Mitigates: Students accessing grading/project management endpoints
    |------------------------------------------------------------------
    */
    Route::prefix('instructor')
        ->middleware(['role:Instructor,Administrator'])
        ->group(function () {
            Route::get('/stats',                          [InstructorController::class, 'getStats']);
            Route::get('/projects',                       [InstructorController::class, 'getProjects']);
            Route::post('/projects',                      [InstructorController::class, 'createProject']);
            Route::get('/submissions',                    [InstructorController::class, 'getSubmissions']);
            Route::post('/submissions/{id}/evaluate',     [InstructorController::class, 'evaluateSubmission']);
            Route::post('/submissions/{id}/revision',     [InstructorController::class, 'requestRevision']);
        });

    /*
    |------------------------------------------------------------------
    | Student Routes — Role: Student or Administrator
    | Mitigates: Instructors submitting on behalf of students
    |------------------------------------------------------------------
    */
    Route::prefix('student')
        ->middleware(['role:Student,Administrator'])
        ->group(function () {
            Route::get('/stats',                       [StudentController::class, 'getDashboardStats']);
            Route::get('/assignments',                 [StudentController::class, 'getAssignments']);
            Route::get('/available-projects',          [StudentController::class, 'getAvailableProjects']);
            Route::post('/projects/{id}/join',         [StudentController::class, 'joinProject']);
            Route::post('/assignments/{id}/submit',    [StudentController::class, 'submitProject']);
            Route::get('/grades',                      [StudentController::class, 'getGrades']);
            Route::get('/revisions',                   [StudentController::class, 'getRevisions']);
        });

    /*
    |------------------------------------------------------------------
    | Team Routes — Any authenticated user (access scoped inside controller)
    |------------------------------------------------------------------
    */
    Route::get('/projects/{id}/team',   [\App\Http\Controllers\TeamController::class, 'getTeam']);
    Route::post('/projects/{id}/team',  [\App\Http\Controllers\TeamController::class, 'createTeam']);
    Route::post('/teams/{id}/invite',   [\App\Http\Controllers\TeamController::class, 'inviteMember']);

    /*
    |------------------------------------------------------------------
    | Discussion Routes — Any authenticated user (scoped in controller)
    | Mitigates: XSS via PostCommentRequest + SanitizeInputMiddleware
    |------------------------------------------------------------------
    */
    Route::get('/assignments/{id}/comments',  [\App\Http\Controllers\DiscussionController::class, 'getComments']);
    Route::post('/assignments/{id}/comments', [\App\Http\Controllers\DiscussionController::class, 'postComment']);
});

