import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';

export default function Index({ jobs, appliedJobIds = [] }) {
    const { auth } = usePage().props;
    const role = auth.user.role;
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    const dashboardRoute = role === 'admin'
        ? route('admin.dashboard')
        : role === 'jobrecruiter'
        ? route('recruiter.dashboard')
        : route('jobseeker.dashboard');

    const totalPages = Math.ceil(jobs.length / perPage);
    const paginated = jobs.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl min-h-screen flex flex-col gap-y-5">
            <div className="flex flex-col w-full">
                <JobseekerHeader jobs={jobs} />
                <div className="w-full mx-auto mt-4">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">All Jobs</h1>
                        <Link href={dashboardRoute} className="text-sm text-gray-500 underline">
                            ← Dashboard
                        </Link>
                    </div>

                    {jobs.length === 0 ? (
                        <p className="text-gray-500">No approved jobs available.</p>
                    ) : (
                        <>
                            <div className="space-y-4 w-1/3">
                                {paginated.map(job => {
                                    const hasApplied = appliedJobIds.includes(job.id);
                                    return (
                                        <div key={job.id} className="bg-white rounded p-4 shadow flex items-start justify-between w-full">
                                            <div className="flex items-center justify-between w-full">
                                                <div>
                                                    <h2 className="text-lg font-semibold">{job.title}</h2>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {job.recruiter.name} · {job.location} · {job.salary_range}
                                                    </p>
                                                    <p className="text-sm text-gray-400">{job.category}</p>
                                                </div>
                                                <Link
                                                    href={route('jobposts.show', job.id)}
                                                    className={`px-4 py-2 rounded text-sm shrink-0 font-bold text-white ml-4 ${
                                                        hasApplied
                                                            ? 'bg-green-600 hover:bg-green-700'
                                                            : 'bg-[#474747] hover:bg-[#3B3B3B]'
                                                    }`}
                                                >
                                                    {hasApplied ? '✓ Applied' : 'Apply'}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center gap-2 mt-6">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-gray-100"
                                    >
                                        ← Prev
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 rounded border text-sm ${
                                                currentPage === page
                                                    ? 'bg-[#474747] text-white border-[#474747]'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-gray-100"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}