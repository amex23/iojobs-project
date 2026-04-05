<?php

namespace App\Notifications;

use App\Models\JobPost;
use App\Models\MessageThread;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminMessageNotification extends Notification
{
    use Queueable;

    public function __construct(
        public JobPost $jobPost,
        public string $body,
        public MessageThread $thread,
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Message from Admin regarding: ' . $this->jobPost->title)
            ->line('You have a new message from the admin about "' . $this->jobPost->title . '":')
            ->line($this->body)
            ->action('View Message', url(route('messages.show', $this->thread->id)))
            ->line('Log in to view and reply.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => '📩 Message from Admin',
            'body'  => $this->body,
            'url'   => route('messages.show', $this->thread->id),
        ];
    }
}