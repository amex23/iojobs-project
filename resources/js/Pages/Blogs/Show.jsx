import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Show({ blog }) {
    return (
        <>
            <Head title={`${blog.title} - IOJobs Blogs`} />
            <div className="bg-[#FAF9F5] h-[100vh]">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <header className="flex items-center justify-between mb-10">
                        <Link href="/" className="flex items-center gap-1">
                            <img className="w-9 h-9 rounded-md" src="/io-logo2.png" alt="" />
                            <h1 className='font-bold text-2xl text-black'>jobs | PH</h1>
                        </Link>
                        <Link href={route('blogs.index')} className="text-sm text-gray-500 underline">← Back to Blogs</Link>
                    </header>

                    <article className="bg-white rounded-xl shadow-sm p-8">
                        <h1 className="text-3xl font-bold text-black mb-3">{blog.title}</h1>
                        <p className="text-sm text-gray-400 mb-6">
                            By {blog.author?.name} · {new Date(blog.created_at).toLocaleDateString()}
                        </p>
                        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {blog.content}
                        </div>
                    </article>
                </div>

                {/* <Footer></Footer> */}
            </div>
        </>
    );
}