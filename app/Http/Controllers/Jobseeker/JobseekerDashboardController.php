<?php

namespace App\Http\Controllers\Jobseeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JobPost;

class JobseekerDashboardController extends Controller
{
    public function index()
    {
        $jobs = JobPost::where('status', 'open')->latest()->get();
        return Inertia::render('Jobseeker/Dashboard', ['jobs' => $jobs]);
    }
}
