<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Models\Department;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Database\Seeders\RoleSeeder;
use Database\Seeders\DepartmentSeeder;

class AdminActionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);
        $this->seed(DepartmentSeeder::class);
    }

    /** @test */
    public function an_admin_can_create_another_admin()
    {
        $adminRole = Role::where('name', 'Admin')->first();
        $adminUser = User::factory()->create(['role_id' => $adminRole->id]);

        $response = $this->actingAs($adminUser)->postJson('/api/admin/users', [
            'name' => 'New Admin',
            'email' => 'newadmin@example.com',
            'password' => 'password123',
            'role_id' => $adminRole->id,
            'department_id' => null,
        ]);

        $response->assertStatus(201)
            ->assertJson(['message' => 'User created successfully']);

        $this->assertDatabaseHas('users', [
            'email' => 'newadmin@example.com',
            'role_id' => $adminRole->id,
        ]);
    }

    /** @test */
    public function an_admin_can_get_report_data()
    {
        $adminRole = Role::where('name', 'Admin')->first();
        $adminUser = User::factory()->create(['role_id' => $adminRole->id]);

        $response = $this->actingAs($adminUser)->getJson('/api/admin/report-data');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'roleDistribution',
                'departmentDistribution',
                'submissionStatus',
                'summary' => [
                    'totalUsers',
                    'totalProjects',
                    'totalSubmissions',
                ]
            ]);
    }
}
