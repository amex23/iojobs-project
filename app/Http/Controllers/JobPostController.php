<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Inertia\Inertia;

class JobPostController extends Controller
{
    public function index()
    {
        $jobs = JobPost::where('status', 'open')
                       ->where('approval_status', 'approved')
                       ->with('recruiter:id,name')
                       ->latest()
                       ->get();

        return Inertia::render('JobPosts/Index', [
            'jobs' => $jobs,
        ]);
    }

    public function show(JobPost $jobPost)
    {
        return Inertia::render('JobPosts/Show', [
            'job' => $jobPost->load('recruiter:id,name'),
        ]);
    }
}