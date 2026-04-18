<?php
namespace App\Http\Controllers\Jobseeker;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobseekerDashboardController extends Controller
{
    public function index()
    {
        $jobs = JobPost::where('status', 'open')
            ->with('recruiter:id,name')
            ->latest()
            ->get();

        $appliedJobIds = \App\Models\MessageThread::where('sender_id', auth()->id())
            ->pluck('job_post_id')
            ->toArray();

        return Inertia::render('Jobseeker/Dashboard', [
            'jobs' => $jobs,
            'appliedJobIds' => $appliedJobIds,
        ]);
    }
}