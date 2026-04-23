import { Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ jobs }) {
    const [composingFor, setComposingFor] = useState(null); // job.id being messaged
    const { data, setData, post, processing, reset, errors } = useForm({ body: '' });

    const approve = (id) => router.patch(route('admin.jobs.approve', id));
    const reject = (id) => router.patch(route('admin.jobs.reject', id));
    const deleteJob = (id) => {
        if (confirm('Delete this job post?')) {
            router.delete(route('admin.jobs.destroy', id));
        }
    };

    const sendMessage = (jobId) => {
        post(route('admin.jobs.message', jobId), {
            onSuccess: () => {
                reset();
                setComposingFor(null);
            },
        });
    };

    const badgeColor = (status) => {
        if (status === 'approved') return 'bg-green-100 text-green-700';
        if (status === 'rejected') return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Manage Job Posts</h1>
                <Link href={route('admin.dashboard')} className="text-sm text-gray-500 underline">
                    ← Dashboard
                </Link>
            </div>

            {jobs.length === 0 ? (
                <p className="text-gray-500">No job posts yet.</p>
            ) : (
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div key={job.id} className="border rounded-lg p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-lg">{job.title}</h2>
                                    <p className="text-sm text-gray-500">
                                        {job.recruiter.name} · {job.location} · {job.salary_range}
                                    </p>
                                    <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${badgeColor(job.approval_status)}`}>
                                        {job.approval_status}
                                    </span>
                                </div>

                                <div className="flex gap-2 flex-wrap justify-end">
                                    <button
                                            onClick={() => router.patch(route('admin.jobs.feature', job.id))}
                                            className={`px-4 py-2 rounded text-sm text-white ${
                                                job.featured ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-500 hover:bg-purple-600'
                                            }`}
                                        >
                                            {job.featured ? '★ Featured' : '☆ Feature'}
                                        </button>

                                    {job.approval_status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => approve(job.id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => reject(job.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => {
                                            setComposingFor(composingFor === job.id ? null : job.id);
                                            reset();
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                                    >
                                        ✉️ Message Poster
                                    </button>
                                    <Link
                                        href={route('admin.jobs.edit', job.id)}
                                        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Compose box */}
                            {composingFor === job.id && (
                                <div className="mt-4 border-t pt-4 bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Message to <span className="text-blue-600">{job.recruiter.name}</span> about <span className="text-blue-600">{job.title}</span>
                                    </p>
                                    <textarea
                                        className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                                        rows={3}
                                        placeholder="Write your message..."
                                        value={data.body}
                                        onChange={e => setData('body', e.target.value)}
                                    />
                                    {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => sendMessage(job.id)}
                                            disabled={processing}
                                            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing ? 'Sending...' : '✉️ Send'}
                                        </button>
                                        <button
                                            onClick={() => { setComposingFor(null); reset(); }}
                                            className="px-5 py-2 rounded-lg text-sm border hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}