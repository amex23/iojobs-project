<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MessageThread;
use App\Models\User;
use App\Notifications\NewMessageNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function show(MessageThread $thread)
    {
        $user = auth()->user();

        if ($thread->sender_id !== $user->id && $thread->recipient_id !== $user->id) {
            abort(403);
        }

        $thread->messages()
            ->where('sender_id', '!=', $user->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        $thread->load(['jobPost', 'sender', 'recipient', 'messages.sender']);

        return Inertia::render('Shared/Messages/Show', [
            'thread' => $thread,
        ]);
    }

    public function reply(Request $request, MessageThread $thread)
    {
        $user = auth()->user();

        if ($thread->sender_id !== $user->id && $thread->recipient_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $message = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $user->id,
            'body'      => $request->body,
        ]);

        $recipientId = $user->id === $thread->sender_id
            ? $thread->recipient_id
            : $thread->sender_id;

        User::find($recipientId)
            ->notify(new NewMessageNotification($thread, $message, $user));

        return redirect()->route('messages.show', $thread->id)
            ->with('success', 'Reply sent!');
    }
}