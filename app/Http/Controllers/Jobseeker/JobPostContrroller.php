<?php

namespace App\Http\Controllers\Jobseeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobseekerDashboardController extends Controller
{
    public function index()
    {
        $jobs = JobPost::where('status', 'open')
                    ->where('approval_status', 'approved')
                    ->with('recruiter:id,name')
                    ->latest()
                    ->get();

        return Inertia::render('Jobseeker/JobPosts/Index', [
            'jobs' => $jobs,
        ]);
    }
}
