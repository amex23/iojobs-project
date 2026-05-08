<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['user_id', 'title', 'content', 'slug'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}