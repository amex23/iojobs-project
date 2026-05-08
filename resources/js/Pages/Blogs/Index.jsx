import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Index({ blogs }) {
    return (
        <>
            <Head title="Blogs - IOJobs" />
            <div className="bg-[#FAF9F5] min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <header className="flex items-center justify-between mb-10">
                        <Link href="/" className="flex items-center gap-1">
                            <img className="w-9 h-9 rounded-md" src="/io-logo2.png" alt="" />
                            <h1 className='font-bold text-2xl text-black'>jobs | PH</h1>
                        </Link>
                        <Link href="/" className="text-sm text-gray-500 underline">← Back to Home</Link>
                    </header>

                    <h2 className="text-2xl font-bold text-black mb-8">
                        {/* 📝  */}
                        Blogs</h2>

                    {blogs.length === 0 ? (
                        <p className="text-gray-500">No blog posts yet.</p>
                    ) : (
                        <div className="w-full lg:w-1/2 space-y-6">
                            {blogs.map(blog => (
                                <Link
                                    key={blog.id}
                                    href={route('blogs.show', blog.slug)}
                                    className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
                                >
                                    <h3 className="text-xl font-semibold text-black mb-2">{blog.title}</h3>
                                    <p className="text-sm text-gray-400 mb-3">
                                        By {blog.author?.name} · {new Date(blog.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {blog.content.length > 200 ? blog.content.substring(0, 200) + '...' : blog.content}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Footer></Footer>
            </div>
        </>
    );
}