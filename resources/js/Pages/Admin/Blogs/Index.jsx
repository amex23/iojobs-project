import { Link, router } from '@inertiajs/react';
import AllHeader from '@/Components/AllHeader';
import Footer from '@/Components/Footer';

export default function Index({ blogs }) {
    const deleteBlog = (id) => {
        if (confirm('Delete this blog?')) {
            router.delete(route('admin.blogs.destroy', id));
        }
    };

    return (
        <div className="px-4 py-8 lg:py-8 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col gap-y-5">
            <AllHeader />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">📝 Blogs</h1>
                <div className="flex gap-3">
                    <Link href={route('admin.blogs.create')} className="bg-[#141413] text-white px-4 py-2 rounded text-sm hover:bg-[#2e2e2e]">
                        + New Blog
                    </Link>
                    <Link href={route('admin.dashboard')} className="text-sm text-gray-500 underline self-center">
                        ← Dashboard
                    </Link>
                </div>
            </div>

            {blogs.length === 0 ? (
                <p className="text-gray-500">No blog posts yet.</p>
            ) : (
                <div className="space-y-4">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-lg">{blog.title}</h2>
                                <p className="text-sm text-gray-400">{blog.author?.name} · {new Date(blog.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <Link
                                href={route('admin.blogs.edit', blog.id)}
                                className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500 mr-2"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => deleteBlog(blog.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            >
                                Delete
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-auto"><Footer /></div>
        </div>
    );
}

