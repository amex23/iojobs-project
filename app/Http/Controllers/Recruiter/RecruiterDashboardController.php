<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RecruiterDashboardController extends Controller
{
    public function index() {
        return inertia('Recruiter/Dashboard');
    }
}
