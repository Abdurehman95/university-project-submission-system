<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\AcademicSession;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            DepartmentSeeder::class,
            ProjectCategorySeeder::class,
        ]);

        // Create Default Academic Session
        AcademicSession::create([
            'name' => 'Fall 2023',
            'start_date' => '2023-09-01',
            'end_date' => '2023-12-31',
            'is_active' => true,
        ]);

        // Create Admin User
        User::create([
            'name' => 'System Admin',
            'email' => 'admin@university.edu',
            'password' => Hash::make('password'),
            'role_id' => 1, // Admin
            'department_id' => 1, // Computer Science
        ]);
    }
}
