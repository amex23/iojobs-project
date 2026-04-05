<?php

namespace App\Http\Controllers\Jobseeker;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use App\Models\Message;
use App\Models\MessageThread;
use App\Models\User;
use App\Notifications\NewMessageNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $threads = MessageThread::where('sender_id', auth()->id())
            ->orWhere('recipient_id', auth()->id())
            ->where(function($q) {
                $q->whereHas('sender', fn($q) => $q->where('role', 'jobseeker'))
                  ->orWhereHas('recipient', fn($q) => $q->where('role', 'jobseeker'));
            })
            ->with(['jobPost', 'sender', 'recipient', 'latestMessage'])
            ->latest()
            ->get();

        return Inertia::render('Jobseeker/Messages/Index', [
            'threads' => $threads,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_post_id' => ['required', 'exists:job_posts,id'],
            'body'        => ['required', 'string', 'max:5000'],
        ]);

        $jobPost = JobPost::findOrFail($request->job_post_id);

        $thread = MessageThread::create([
            'job_post_id'  => $jobPost->id,
            'sender_id'    => auth()->id(),
            'recipient_id' => $jobPost->user_id,
        ]);

        $message = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => auth()->id(),
            'body'      => $request->body,
        ]);

        User::find($jobPost->user_id)
            ->notify(new NewMessageNotification($thread, $message, auth()->user()));

        return redirect()->route('messages.show', $thread->id)
            ->with('success', 'Message sent!');
    }
}