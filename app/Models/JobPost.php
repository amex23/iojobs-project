<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'salary_range',
        'category',
        'status',
        'approval_status',
        'featured',
    ];

    public function recruiter()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}