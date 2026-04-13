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

        $appliedJobIds = \App\Models\MessageThread::where('sender_id', auth()->id())
            ->pluck('job_post_id')
            ->toArray();

        return Inertia::render('JobPosts/Index', [
            'jobs' => $jobs,
            'appliedJobIds' => $appliedJobIds,
        ]);
    }
}
