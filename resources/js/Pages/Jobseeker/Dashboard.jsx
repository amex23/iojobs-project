import { useState } from 'react';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';

const CATEGORIES = [
    'All',
    'IT/Web Development',
    'Virtual Assistant',
    'Graphic Design',
    'Data Entry',
    'Customer Service',
    'Accounting & Finance',
    'Marketing & Sales',
    'Engineering',
    'Healthcare',
    'Others',
];

export default function Dashboard({ jobs = [], appliedJobIds = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const perPage = 5;

    const normalizedAppliedIds = appliedJobIds.map(id => parseInt(id));
    const approved = jobs.filter(job => job.approval_status === 'approved');

    const filtered = selectedCategory === 'All'
        ? approved
        : approved.filter(job => job.category === selectedCategory);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div className="px-4 md:px-12 py-8 md:py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between min-h-screen">
            <div className='flex flex-col'>

                <JobseekerHeader jobs={jobs} />

                {/* Mobile Filter Toggle */}
                <div className="w-full mb-3">
                        <Link href={route('profile.edit')} className="flex items-center gap-1 text-sm text-gray-500 underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            My Profile
                        </Link>
                </div>

                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="lg:hidden mb-3 px-4 py-2 bg-[#474747] text-white rounded text-sm font-bold w-fit"
                >
                    {showFilter ? '✕ Hide Filters' : '☰ Filter by Category'}
                </button>

                <div className="flex flex-col lg:flex-row mt-2 gap-4">

                    {/* Filter Sidebar */}
                    <div className={`${showFilter ? 'flex' : 'hidden'} lg:flex flex-col bg-white shadow-md p-4 rounded gap-1 lg:self-start lg:sticky lg:top-4 lg:w-[30%] w-full`}>
                        <span className='mb-2'>Filter by Category</span>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                    setShowFilter(false);
                                }}
                                className={`text-left px-3 py-1 rounded text-sm ${
                                    selectedCategory === cat
                                        ? 'bg-white bg-gray-300 text-black font-bold'
                                        : 'text-black hover:bg-gray-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Job Posts */}
                    <div className='flex-1 lg:w-[70%] px-0 lg:px-4 py-0 rounded flex flex-col gap-3'>
                        {paginated.length === 0 ? (
                            <p className="text-gray-500">No job posts found.</p>
                        ) : (
                            paginated.map(job => {
                                const hasApplied = normalizedAppliedIds.includes(job.id);
                                return (
                                    <div key={job.id} className="bg-white rounded p-4 shadow flex flex-col sm:flex-row items-start justify-between gap-3">
                                        <div className="flex-1 flex flex-col gap-y-2">
                                            <h3 className="font-bold text-lg">{job.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {job.recruiter?.name} · {job.location} · {job.salary_range}
                                            </p>
                                            <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded w-fit">
                                                {job.category}
                                            </span>
                                            <p className="text-sm text-gray-600">
                                                {job.description?.length > 250
                                                    ? job.description.substring(0, 250) + '...'
                                                    : job.description}
                                            </p>
                                        </div>
                                        <Link
                                            href={route('jobposts.show', job.id)}
                                            className={`px-4 py-2 rounded text-sm shrink-0 font-bold text-white self-start sm:self-center ${
                                                hasApplied
                                                    ? 'bg-[#00D100] hover:bg-green-700'
                                                    : 'bg-[#474747] hover:bg-[#3B3B3B]'
                                            }`}
                                        >
                                            {hasApplied ? '✓ Applied' : 'Apply'}
                                        </Link>
                                    </div>
                                );
                            })
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
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
                    </div>

                </div>
            </div>
            <div className='mt-7'>
                <Footer />
            </div>
        </div>
    );
}