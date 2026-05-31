<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;
use App\Models\Submission;
use App\Models\AuditLog;
use App\Models\Department;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getStats()
    {
        $totalUsers = User::count();
        $activeProjects = Project::count();
        $submissions = Submission::count();
        
        return response()->json([
            'stats' => [
                [
                    'title' => 'Total Users',
                    'value' => $totalUsers,
                    'trend' => '+12%'
                ],
                [
                    'title' => 'Active Projects',
                    'value' => $activeProjects,
                    'trend' => '+5%'
                ],
                [
                    'title' => 'Total Submissions',
                    'value' => $submissions,
                    'trend' => 'Stable'
                ],
                [
                    'title' => 'System Status',
                    'value' => 'Online',
                    'trend' => 'Stable'
                ]
            ]
        ]);
    }

    public function getUsers()
    {
        $users = User::with(['role', 'department'])->get()->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ? $user->role->name : 'N/A',
                'department' => $user->department ? $user->department->name : 'N/A',
                'status' => 'Active',
                'joined' => $user->created_at->format('M d, Y')
            ];
        });

        return response()->json($users);
    }

    /**
     * Create a new user (admin only).
     * Mitigates: SQL Injection, Missing input validation, Plain-text passwords.
     */
    public function createUser(CreateUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id'],
            'department_id' => $validated['department_id'] ?? null,
        ]);

        // Log action
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'Created ' . ($user->role ? $user->role->name : 'User'),
            'entity' => 'User',
            'entity_id' => $user->id,
            'level' => 'Info'
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user->load('role', 'department')], 201);
    }

    public function getReportData()
    {
        $roleStats = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->select('roles.name', DB::raw('count(*) as count'))
            ->groupBy('roles.name')
            ->get();

        $deptStats = DB::table('users')
            ->leftJoin('departments', 'users.department_id', '=', 'departments.id')
            ->select(DB::raw("COALESCE(departments.name, 'Unassigned') as name"), DB::raw('count(*) as count'))
            ->groupBy('departments.name')
            ->get();

        $submissionStats = DB::table('submissions')
            ->select(DB::raw('status'), DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        return response()->json([
            'roleDistribution' => $roleStats,
            'departmentDistribution' => $deptStats,
            'submissionStatus' => $submissionStats,
            'summary' => [
                'totalUsers' => User::count(),
                'totalProjects' => Project::count(),
                'totalSubmissions' => Submission::count(),
                'totalDepartments' => Department::count(),
            ]
        ]);
    }

    public function getLogs()
    {
        $logs = AuditLog::with('user')->orderBy('created_at', 'desc')->take(20)->get()->map(function($log) {
            return [
                'id' => $log->id,
                'action' => $log->action,
                'user' => $log->user ? $log->user->email : 'System',
                'time' => $log->created_at->diffForHumans(),
                'level' => $log->level ?? 'Info',
            ];
        });

        return response()->json($logs);
    }

    public function getDepartmentsWithStats()
    {
        $departments = Department::withCount('users')->get()->map(function($dept) {
            return [
                'id' => $dept->id,
                'name' => $dept->name,
                'users_count' => $dept->users_count,
            ];
        });

        return response()->json($departments);
    }

    public function getEarlyWarningData()
    {
        // Projects with no activity in the last 7 days
        $sevenDaysAgo = now()->subDays(7);

        $atRiskAssignments = \App\Models\ProjectAssignment::with(['project', 'student', 'group'])
            ->where('status', '!=', 'Graded')
            ->where('status', '!=', 'Completed')
            ->where(function($query) use ($sevenDaysAgo) {
                $query->whereDoesntHave('submissions', function($q) use ($sevenDaysAgo) {
                    $q->where('created_at', '>', $sevenDaysAgo);
                })->whereDoesntHave('comments', function($q) use ($sevenDaysAgo) {
                    $q->where('created_at', '>', $sevenDaysAgo);
                })->where('assigned_at', '<', $sevenDaysAgo);
            })
            ->get()->map(function($assignment) {
                return [
                    'id' => $assignment->id,
                    'project_title' => $assignment->project->title,
                    'student_name' => $assignment->student->name ?? ($assignment->group ? $assignment->group->name : 'N/A'),
                    'last_activity' => $assignment->updated_at->diffForHumans(),
                    'risk_level' => 'High',
                    'days_inactive' => now()->diffInDays($assignment->updated_at),
                ];
            });

        return response()->json($atRiskAssignments);
    }

    public function getDepartmentHeatmap()
    {
        $heatmap = Department::with(['users.submissions' => function($q) {
            $q->select('submissions.id', 'submissions.status', 'submissions.created_at');
        }])->get()->map(function($dept) {
            $totalSubmissions = 0;
            $gradedSubmissions = 0;

            foreach ($dept->users as $user) {
                $totalSubmissions += $user->submissions->count();
                $gradedSubmissions += $user->submissions->where('status', 'Graded')->count();
            }

            return [
                'name' => $dept->name,
                'total' => $totalSubmissions,
                'completed' => $gradedSubmissions,
                'rate' => $totalSubmissions > 0 ? round(($gradedSubmissions / $totalSubmissions) * 100) : 0,
            ];
        });

        return response()->json($heatmap);
    }

    public function exportReport()
    {
        $data = Department::withCount('users')->get();
        
        $filename = "system_report_" . date('Y-m-d') . ".csv";
        $handle = fopen('php://output', 'w');
        
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        
        fputcsv($handle, ['Department Name', 'Total Students', 'Active Projects', 'Completion Rate %']);
        
        foreach ($data as $dept) {
            fputcsv($handle, [
                $dept->name,
                $dept->users_count,
                Project::whereHas('category', function($q) use ($dept) {
                    $q->where('name', $dept->name); // Assuming category name matches dept name for simplicity in report
                })->count(),
                'N/A' // Placeholder
            ]);
        }
        
        fclose($handle);
        exit;
    }
}
