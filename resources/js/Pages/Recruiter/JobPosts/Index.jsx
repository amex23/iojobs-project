import { Link, router } from '@inertiajs/react';

export default function Index({ jobs }) {
    const deleteJob = (id) => {
        if (confirm('Delete this job post?')) {
            router.delete(route('recruiter.jobs.destroy', id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Job Posts</h1>
                <Link
                    href={route('recruiter.jobs.create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Post a Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <p className="text-gray-500">No job posts yet.</p>
            ) : (
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div key={job.id} className="border rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-lg">{job.title}</h2>
                                <p className="text-sm text-gray-500">{job.location} · {job.salary_range} · <span className={job.status === 'open' ? 'text-green-600' : 'text-red-500'}>{job.status}</span></p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={route('recruiter.jobs.edit', job.id)}
                                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteJob(job.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6">
                <Link href={route('recruiter.dashboard')} className="text-sm text-gray-500 underline">
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );
}