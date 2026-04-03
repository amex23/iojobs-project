import { Link, router } from '@inertiajs/react';

export default function Index({ jobs }) {
    const approve = (id) => router.patch(route('admin.jobs.approve', id));
    const reject = (id) => router.patch(route('admin.jobs.reject', id));

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
                        <div key={job.id} className="border rounded-lg p-5 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-lg">{job.title}</h2>
                                <p className="text-sm text-gray-500">
                                    {job.recruiter.name} · {job.location} · {job.salary_range}
                                </p>
                                <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${badgeColor(job.approval_status)}`}>
                                    {job.approval_status}
                                </span>
                            </div>

                            {job.approval_status === 'pending' && (
                                <div className="flex gap-2">
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
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}