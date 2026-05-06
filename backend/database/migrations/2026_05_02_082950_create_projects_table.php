<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->text('objectives')->nullable();
            $table->text('requirements')->nullable();
            $table->text('deliverables')->nullable();
            $table->dateTime('deadline');
            $table->foreignId('category_id')->constrained('project_categories');
            $table->foreignId('instructor_id')->constrained('users');
            $table->foreignId('session_id')->constrained('academic_sessions');
            $table->boolean('is_group_project')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
