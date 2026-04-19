<?php

namespace App\Notifications;

use App\Models\Message;
use App\Models\MessageThread;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewMessageNotification extends Notification
{
    use Queueable;

    public function __construct(
        public MessageThread $thread,
        public Message $message,
        public User $sender,
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $jobTitle = $this->thread->jobPost?->title ?? 'General Inquiry';

        return [
            'thread_id'   => $this->thread->id,
            'sender_name' => $this->sender->name,
            'job_title'   => $jobTitle,
            'title'       => 'New message from ' . $this->sender->name,
            'body'        => $jobTitle,
            'preview'     => \Str::limit($this->message->body, 80),
            'url'         => route('messages.show', $this->thread->id),
        ];
    }
}