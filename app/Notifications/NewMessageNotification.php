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
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New message from ' . $this->sender->name)
            ->line($this->sender->name . ' sent you a message regarding: ' . $this->thread->jobPost->title)
            ->line('"' . \Str::limit($this->message->body, 100) . '"')
            ->action('View Message', url(route('messages.show', $this->thread->id)))
            ->line('Log in to reply.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'thread_id'   => $this->thread->id,
            'sender_name' => $this->sender->name,
            'job_title'   => $this->thread->jobPost->title,
            'preview'     => \Str::limit($this->message->body, 80),
            'url'         => route('messages.show', $this->thread->id),
        ];
    }
}