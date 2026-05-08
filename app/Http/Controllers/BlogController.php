<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('author:id,name')->latest()->get();
        return Inertia::render('Blogs/Index', ['blogs' => $blogs]);
    }

    public function show(Blog $blog)
    {
        return Inertia::render('Blogs/Show', ['blog' => $blog->load('author:id,name')]);
    }
}