<?php

namespace App\Http\Controllers;

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

    public function createUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|integer|exists:roles,id',
            'department_id' => 'nullable|integer|exists:departments,id',
        ]);

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
}
