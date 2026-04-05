import { Link, usePage } from '@inertiajs/react';

export default function Index({ jobs }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const dashboardRoute = role === 'admin'
        ? route('admin.dashboard')
        : role === 'jobrecruiter'
        ? route('recruiter.dashboard')
        : route('jobseeker.dashboard');

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">All Approved Jobs</h1>
                <Link href={dashboardRoute} className="text-sm text-gray-500 underline">
                    ← Dashboard
                </Link>
            </div>

            {jobs.length === 0 ? (
                <p className="text-gray-500">No approved jobs available.</p>
            ) : (
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div key={job.id} className="border rounded-lg p-5 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{job.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {job.recruiter.name} · {job.location} · {job.salary_range}
                                    </p>
                                    <p className="text-sm text-gray-400">{job.category}</p>
                                </div>
                                <Link
                                    href={route('jobposts.show', job.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}