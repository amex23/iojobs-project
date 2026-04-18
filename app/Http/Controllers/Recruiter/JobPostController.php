<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;


class JobPostController extends Controller
{
    public function index()
    {
        $jobs = JobPost::where('user_id', auth()->id())
                       ->latest()
                       ->get();

        return Inertia::render('Recruiter/JobPosts/Index', [
            'jobs' => $jobs,
        ]);
    }

    // public function approve(JobPost $jobPost)
    // {
    //     $jobPost->update(['approval_status' => 'approved']);

    //     return back()->with('success', 'Job approved!');
    // }

    // public function reject(JobPost $jobPost)
    // {
    //     $jobPost->update(['approval_status' => 'rejected']);

    //     return back()->with('success', 'Job rejected!');
    // }


    public function create()
    {
        return Inertia::render('Recruiter/JobPosts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location'    => ['nullable', 'string', 'max:255'],
            'salary_range'=> ['nullable', 'string', 'max:100'],
            'category'    => ['nullable', 'string', 'max:100'],
            'status'      => ['required', 'in:open,closed'],
        ]);

        JobPost::create([
            ...$request->only('title', 'description', 'location', 'salary_range', 'category', 'status'),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('recruiter.jobs.index')
                         ->with('success', 'Job post created!');
    }

    public function edit(JobPost $jobPost)
    {
        if ($jobPost->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Recruiter/JobPosts/Edit', [
            'job' => $jobPost,
        ]);
    }

   public function update(Request $request, JobPost $jobPost)
    {
        if ($jobPost->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'description'  => ['required', 'string'],
            'location'     => ['nullable', 'string', 'max:255'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'category'     => ['nullable', 'string', 'max:100'],
            'status'       => ['required', 'in:open,closed'],
        ]);

        $jobPost->update($request->only('title', 'description', 'location', 'salary_range', 'category', 'status'));

        return redirect()->route('recruiter.jobs.index')
                         ->with('success', 'Job post updated!');
    }

    public function destroy(JobPost $jobPost)
    {
        if ($jobPost->user_id !== auth()->id()) {
            abort(403);
        }

        if ($jobPost->approval_status === 'approved') {
            abort(403, 'Approved job posts cannot be deleted.');
        }

        $jobPost->delete();

        return redirect()->route('recruiter.jobs.index')
                         ->with('success', 'Job post deleted!');
    }

    public function allJobs()
    {
        $jobs = \App\Models\JobPost::where('status', 'open')
            ->where('approval_status', 'approved')
            ->with('recruiter:id,name')
            ->latest()
            ->get();

        return Inertia::render('Recruiter/AllJobs', [
            'jobs' => $jobs,
        ]);
    }
}