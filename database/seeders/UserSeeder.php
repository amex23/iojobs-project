<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@test.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        User::create([
            'name'     => 'Recruiter',
            'email'    => 'recruiter@test.com',
            'password' => Hash::make('password'),
            'role'     => 'jobrecruiter',
        ]);

        User::create([
            'name'     => 'Jobseeker',
            'email'    => 'jobseeker@test.com',
            'password' => Hash::make('password'),
            'role'     => 'jobseeker',
        ]);
    }
}