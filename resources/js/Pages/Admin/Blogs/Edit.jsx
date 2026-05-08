import { useForm, Link } from '@inertiajs/react';
import AllHeader from '@/Components/AllHeader';
import Footer from '@/Components/Footer';

export default function Edit({ blog }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: blog.title,
        content: blog.content,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.blogs.update', blog.id));
    };

    return (
        <div className="px-4 py-8 lg:py-8 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col gap-y-5">
            <AllHeader />
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">📝 Edit Blog Post</h2>
                <Link href={route('admin.blogs.index')} className="text-sm text-gray-500 underline">
                    ← Back to Blogs
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-8 max-w-3xl">
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            rows={12}
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413] resize-none"
                            required
                        />
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#141413] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#2e2e2e] transition text-sm disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href={route('admin.blogs.index')}
                            className="py-3 px-6 rounded-lg border text-sm hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
            <div className="mt-auto"><Footer /></div>
        </div>
    );
}