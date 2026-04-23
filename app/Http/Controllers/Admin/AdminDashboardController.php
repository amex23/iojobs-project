<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MessageThread;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function messages()
    {
        $threads = MessageThread::where('recipient_id', auth()->id())
            ->orWhere('sender_id', auth()->id())
            ->with(['sender', 'recipient', 'jobPost', 'messages' => function($q) {
                $q->latest()->limit(1);
            }])
            ->latest()
            ->get();

        return Inertia::render('Admin/Messages', [
            'threads' => $threads,
        ]);
    }

    public function users()
    {
        $recruiters = User::where('role', 'jobrecruiter')->get();
        $jobseekers = User::where('role', 'jobseeker')->get();

        return Inertia::render('Admin/Users', [
            'recruiters' => $recruiters,
            'jobseekers' => $jobseekers,
        ]);
    }
}