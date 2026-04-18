<?php
namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostController extends Controller
{
    public function index(Request $request)
    {
        $query = JobPost::where('status', 'open')
            ->where('approval_status', 'approved')
            ->with('recruiter:id,name')
            ->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $jobs = $query->get();

        $appliedJobIds = \App\Models\MessageThread::where('sender_id', auth()->id())
            ->pluck('job_post_id')
            ->toArray();

        return Inertia::render('JobPosts/Index', [
            'jobs' => $jobs,
            'appliedJobIds' => $appliedJobIds,
        ]);
    }

    public function show(JobPost $jobPost)
    {
        return Inertia::render('JobPosts/Show', [
            'job' => $jobPost->load('recruiter:id,name'),
        ]);
    }
}