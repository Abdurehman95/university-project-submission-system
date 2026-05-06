<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            'Computer Science',
            'Information Technology',
            'Software Engineering',
            'Electrical Engineering'
        ];

        foreach ($departments as $dept) {
            Department::create(['name' => $dept]);
        }
    }
}
