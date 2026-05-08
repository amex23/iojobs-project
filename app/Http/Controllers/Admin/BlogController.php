<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('author:id,name')->latest()->get();
        return Inertia::render('Admin/Blogs/Index', ['blogs' => $blogs]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    public function store(Request $request)
        {
            $request->validate([
                'title'   => 'required|string|max:255',
                'content' => 'required|string',
            ]);

            Blog::create([
                'user_id' => auth()->id(),
                'title'   => $request->title,
                'content' => $request->content,
                'slug'    => Str::slug($request->title) . '-' . time(),
            ]);

            return redirect()->route('admin.blogs.index')->with('success', 'Blog post created!');
        }

        public function destroy(Blog $blog)
        {
            $blog->delete();
            return back()->with('success', 'Blog deleted!');
        }

        public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', ['blog' => $blog]);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog->update([
            'title'   => $request->title,
            'content' => $request->content,
            'slug'    => \Illuminate\Support\Str::slug($request->title) . '-' . time(),
        ]);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated!');
    }
}