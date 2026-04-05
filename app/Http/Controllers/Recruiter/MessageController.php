<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use App\Models\MessageThread;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $threads = MessageThread::where('sender_id', auth()->id())
            ->orWhere('recipient_id', auth()->id())
            ->with(['jobPost', 'sender', 'recipient', 'latestMessage'])
            ->latest()
            ->get();

        return Inertia::render('Recruiter/Messages/Index', [
            'threads' => $threads,
        ]);
    }
}