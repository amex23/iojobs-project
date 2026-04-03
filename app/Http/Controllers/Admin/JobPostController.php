<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Inertia\Inertia;

class JobPostController extends Controller
{
    public function index()
    {
        $jobs = JobPost::with('recruiter:id,name')
                       ->latest()
                       ->get();

        return Inertia::render('Admin/JobPosts/Index', [
            'jobs' => $jobs,
        ]);
    }

    public function approve(JobPost $jobPost)
    {
        $jobPost->update(['approval_status' => 'approved']);

        return back()->with('success', 'Job approved!');
    }

    public function reject(JobPost $jobPost)
    {
        $jobPost->update(['approval_status' => 'rejected']);

        return back()->with('success', 'Job rejected!');
    }
}