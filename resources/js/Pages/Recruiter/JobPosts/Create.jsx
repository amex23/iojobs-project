import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        salary_range: '',
        category: '',
        status: 'open',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('recruiter.jobs.store'));
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea rows={5} value={data.description} onChange={e => setData('description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" value={data.location} onChange={e => setData('location', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                    <input type="text" value={data.salary_range} onChange={e => setData('salary_range', e.target.value)}
                        placeholder="e.g. ₱20,000 - ₱30,000"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" value={data.category} onChange={e => setData('category', e.target.value)}
                        placeholder="e.g. Web Developer, Virtual Assistant"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select value={data.status} onChange={e => setData('status', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Link href={route('recruiter.jobs.index')} className="text-sm text-gray-500 underline">
                        Cancel
                    </Link>
                    <button type="submit" disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
}