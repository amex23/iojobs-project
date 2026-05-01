import { Link, router, usePage } from '@inertiajs/react';
import RecruiterHeader from '@/Components/RecruiterHeader';
import Footer from '@/Components/Footer';

export default function Index({ jobs }) {
    const { auth } = usePage().props;

    const deleteJob = (id) => {
        if (confirm('Delete this job post?')) {
            router.delete(route('recruiter.jobs.destroy', id));
        }
    };

    return (
        <div className="px-4 lg:px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl min-h-screen flex flex-col gap-y-5">

            <div className="flex flex-col w-full">
                <RecruiterHeader></RecruiterHeader>
                <div className="bg-white shadow-md rounded-sm p-6 mt-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">My Job Posts</h1>
                        <Link
                            href={route('recruiter.jobs.create')}
                            className="bg-[#474747] hover:bg-[#141413] text-white px-4 py-2 rounded"
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
                                        <p className="text-sm text-gray-500">
                                            {job.location} · {job.salary_range} ·{' '}
                                            <span className={job.status === 'open' ? 'text-green-600' : 'text-red-500'}>
                                                {job.status}
                                            </span>
                                            {' · '}
                                            <span className={
                                                job.approval_status === 'approved' ? 'text-green-600' :
                                                job.approval_status === 'rejected' ? 'text-red-500' :
                                                'text-yellow-500'
                                            }>
                                                {job.approval_status}
                                            </span>
                                        </p>
                                    </div>

                                    {job.user_id === auth.user.id && (
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('recruiter.jobs.edit', job.id)}
                                                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                            >
                                                Edit
                                            </Link>

                                            {job.approval_status !== 'approved' && (
                                                <button
                                                    onClick={() => deleteJob(job.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    )}
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
            </div>

            <Footer></Footer>
        </div>
    );
}


