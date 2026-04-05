<?php

namespace App\Notifications;

use App\Models\JobPost;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobPostStatusNotification extends Notification
{
    use Queueable;

    public function __construct(
        public JobPost $jobPost,
        public string $status,
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $isApproved = $this->status === 'approved';

        return (new MailMessage)
            ->subject($isApproved ? 'Your Job Post is Live ✅' : 'Your Job Post was Rejected ❌')
            ->line($isApproved
                ? 'Your job post "' . $this->jobPost->title . '" has been approved and is now live.'
                : 'Your job post "' . $this->jobPost->title . '" was rejected. Please review and resubmit.')
            ->action('View My Jobs', url(route('recruiter.jobs.index')))
            ->line('Thank you for using iojobs!');
    }

    public function toDatabase(object $notifiable): array
    {
        $isApproved = $this->status === 'approved';

        return [
            'title' => $isApproved ? 'Job Post Approved ✅' : 'Job Post Rejected ❌',
            'body'  => $isApproved
                ? 'Your job post "' . $this->jobPost->title . '" has been approved and is now live.'
                : 'Your job post "' . $this->jobPost->title . '" was rejected. Please review and resubmit.',
            'url'   => route('recruiter.jobs.index'),
        ];
    }
}