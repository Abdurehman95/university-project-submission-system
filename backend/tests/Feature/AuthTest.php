<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Models\Department;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Database\Seeders\RoleSeeder;
use Database\Seeders\DepartmentSeeder;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed necessary data
        $this->seed(RoleSeeder::class);
        $this->seed(DepartmentSeeder::class);
    }

    /** @test */
    public function a_user_can_register()
    {
        $role = Role::where('name', 'Student')->first();
        $department = Department::first();

        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role_id' => $role->id,
            'department_id' => $department->id,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'User registered successfully. Please login.',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
            'name' => 'John Doe',
        ]);
    }

    /** @test */
    public function a_user_can_login()
    {
        $role = Role::where('name', 'Student')->first();
        
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
            'role_id' => $role->id,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'user' => [
                    'id', 'name', 'email', 'role',
                ],
            ]);
    }

    /** @test */
    public function an_authenticated_user_can_get_their_profile()
    {
        $role = Role::where('name', 'Student')->first();
        
        $user = User::create([
            'name' => 'Profile User',
            'email' => 'profile@example.com',
            'password' => Hash::make('password123'),
            'role_id' => $role->id,
        ]);

        $token = $user->createToken('test_token')->plainTextToken;

        $response = $this->getJson('/api/me', [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'email' => 'profile@example.com',
                'name' => 'Profile User',
            ]);
    }

    /** @test */
    public function an_unauthenticated_user_cannot_access_protected_routes()
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401);
    }
}
