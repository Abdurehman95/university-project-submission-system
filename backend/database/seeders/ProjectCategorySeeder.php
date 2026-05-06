<?php

namespace Database\Seeders;

use App\Models\ProjectCategory;
use Illuminate\Database\Seeder;

class ProjectCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Web Development', 'description' => 'Building websites and web applications.'],
            ['name' => 'Mobile Development', 'description' => 'Creating mobile apps for iOS and Android.'],
            ['name' => 'Data Science', 'description' => 'Analyzing data and building machine learning models.'],
            ['name' => 'Cyber Security', 'description' => 'Protecting systems and networks from digital attacks.'],
        ];

        foreach ($categories as $cat) {
            ProjectCategory::create($cat);
        }
    }
}
