<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use App\Models\Message;
use App\Models\MessageThread;
use App\Models\User;
use App\Notifications\AdminMessageNotification;
use App\Notifications\JobPostStatusNotification;
use Illuminate\Http\Request;
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

        User::find($jobPost->user_id)
            ->notify(new JobPostStatusNotification($jobPost, 'approved'));

        return back()->with('success', 'Job approved!');
    }

    public function reject(JobPost $jobPost)
    {
        $jobPost->update(['approval_status' => 'rejected']);

        User::find($jobPost->user_id)
            ->notify(new JobPostStatusNotification($jobPost, 'rejected'));

        return back()->with('success', 'Job rejected!');
    }

    public function edit(JobPost $jobPost)
    {
        return Inertia::render('Admin/JobPosts/Edit', [
            'job' => $jobPost,
        ]);
    }

    public function update(Request $request, JobPost $jobPost)
    {
        $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'description'  => ['required', 'string'],
            'location'     => ['nullable', 'string', 'max:255'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'category'     => ['nullable', 'string', 'max:100'],
            'status'       => ['required', 'in:open,closed'],
        ]);

        $jobPost->update($request->only('title', 'description', 'location', 'salary_range', 'category', 'status'));

        return redirect()->route('admin.jobs.index')
                         ->with('success', 'Job post updated!');
    }

    public function destroy(JobPost $jobPost)
    {
        $jobPost->delete();

        return redirect()->route('admin.jobs.index')
                         ->with('success', 'Job post deleted!');
    }

    public function message(Request $request, JobPost $jobPost)
    {
        $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $thread = MessageThread::create([
            'job_post_id'  => $jobPost->id,
            'sender_id'    => auth()->id(),
            'recipient_id' => $jobPost->user_id,
        ]);

        Message::create([
            'thread_id' => $thread->id,
            'sender_id' => auth()->id(),
            'body'      => $request->body,
        ]);

        User::find($jobPost->user_id)
            ->notify(new AdminMessageNotification($jobPost, $request->body, $thread));

        return back()->with('success', 'Message sent!');
    }


    public function feature(\App\Models\JobPost $jobPost)
    {
        $featuredCount = \App\Models\JobPost::where('featured', true)->count();

        if (!$jobPost->featured && $featuredCount >= 3) {
            return back()->withErrors(['featured' => 'Maximum 3 featured jobs allowed.']);
        }

        $jobPost->update(['featured' => !$jobPost->featured]);

        return back()->with('success', 'Job feature status updated!');
    }
}