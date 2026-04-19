<?php
namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\MessageThread;
use App\Models\Message;

class RecruiterDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Recruiter/Dashboard');
    }

    public function contactAdmin()
    {
        $admin = User::where('role', 'admin')->first();
        return Inertia::render('Recruiter/ContactAdmin', [
            'admin' => $admin,
        ]);
    }

    public function sendToAdmin(Request $request)
    {
        $request->validate(['body' => 'required|string']);

        $admin = User::where('role', 'admin')->first();

        $thread = MessageThread::create([
            'sender_id' => auth()->id(),
            'recipient_id' => $admin->id,
            'job_post_id' => null,
        ]);

        $message = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => auth()->id(),
            'body' => $request->body,
        ]);

        $admin->notify(new \App\Notifications\NewMessageNotification($thread, $message, auth()->user()));

        return redirect()->route('recruiter.dashboard')->with('success', 'Message sent to admin!');
    }
}