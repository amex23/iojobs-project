<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\JobPostController as AdminJobPostController;
use App\Http\Controllers\Recruiter\RecruiterDashboardController;
use App\Http\Controllers\Recruiter\JobPostController as RecruiterJobPostController;
use App\Http\Controllers\Jobseeker\JobseekerDashboardController;
use App\Http\Controllers\Jobseeker\JobPostController as JobseekerJobPostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Jobseeker\MessageController as JobseekerMessageController;
use App\Http\Controllers\Recruiter\MessageController as RecruiterMessageController;
use App\Http\Controllers\MessageController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $role = auth()->user()->role;
    return match($role) {
        'admin'        => redirect()->route('admin.dashboard'),
        'jobrecruiter' => redirect()->route('recruiter.dashboard'),
        default        => redirect()->route('jobseeker.dashboard'),
    };
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/jobs', [AdminJobPostController::class, 'index'])->name('jobs.index');
    Route::patch('/jobs/{jobPost}/approve', [AdminJobPostController::class, 'approve'])->name('jobs.approve');
    Route::patch('/jobs/{jobPost}/reject', [AdminJobPostController::class, 'reject'])->name('jobs.reject');
    Route::get('/jobs/{jobPost}/edit', [AdminJobPostController::class, 'edit'])->name('jobs.edit');
    Route::patch('/jobs/{jobPost}', [AdminJobPostController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{jobPost}', [AdminJobPostController::class, 'destroy'])->name('jobs.destroy');
    Route::post('/jobs/{jobPost}/message', [AdminJobPostController::class, 'message'])->name('jobs.message');
});

// Recruiter
Route::middleware(['auth', 'role:jobrecruiter'])->prefix('recruiter')->name('recruiter.')->group(function () {
    Route::get('/dashboard', [RecruiterDashboardController::class, 'index'])->name('dashboard');
    Route::get('/jobs/all', [RecruiterJobPostController::class, 'allJobs'])->name('jobs.all');
    Route::resource('jobs', RecruiterJobPostController::class)
        ->except(['show'])
        ->parameters(['jobs' => 'jobPost']);
    Route::get('/messages', [RecruiterMessageController::class, 'index'])->name('messages.index');
});

// Jobseeker
Route::middleware(['auth', 'role:jobseeker'])->prefix('jobseeker')->name('jobseeker.')->group(function () {
    Route::get('/dashboard', [JobseekerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/messages', [JobseekerMessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [JobseekerMessageController::class, 'store'])->name('messages.store');
});

// All authenticated users
Route::middleware(['auth'])->group(function () {
    Route::get('/jobposts', [JobPostController::class, 'index'])->name('jobposts.index');
    Route::get('/jobposts/{jobPost}', [JobPostController::class, 'show'])->name('jobposts.show');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markRead'])->name('notifications.read');
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllRead'])->name('notifications.readAll');
    Route::get('/messages/{thread}', [MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{thread}/reply', [MessageController::class, 'reply'])->name('messages.reply');
});

require __DIR__.'/auth.php';