<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MessageThread extends Model
{
    protected $fillable = ['job_post_id', 'sender_id', 'recipient_id'];

    public function jobPost()
    {
        return $this->belongsTo(JobPost::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'thread_id')->orderBy('created_at');
    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class, 'thread_id')->latestOfMany();
    }
}