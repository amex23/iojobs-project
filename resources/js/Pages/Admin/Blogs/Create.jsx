import { useForm, Link } from '@inertiajs/react';
import AllHeader from '@/Components/AllHeader';
import Footer from '@/Components/Footer';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blogs.store'));
    };

    return (
        <div className="px-4 py-8 lg:py-8 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col gap-y-5">
            <AllHeader />
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">📝 New Blog Post</h2>
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
                            placeholder="Blog title..."
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
                            placeholder="Write your blog content here..."
                            required
                        />
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#141413] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#2e2e2e] transition text-sm disabled:opacity-50"
                    >
                        {processing ? 'Publishing...' : 'Publish Blog'}
                    </button>
                </form>
            </div>
            <div className="mt-auto"><Footer /></div>
        </div>
    );
}