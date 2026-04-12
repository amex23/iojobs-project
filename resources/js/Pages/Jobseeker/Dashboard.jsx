import { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';

const CATEGORIES = [
    'All',
    'Web Development',
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

export default function Dashboard({ jobs = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Jobs matching search keyword (for dropdown suggestions)
    const suggestions = search.trim().length > 0
        ? jobs.filter(job =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.category?.toLowerCase().includes(search.toLowerCase()) ||
            job.location?.toLowerCase().includes(search.toLowerCase())
          ).slice(0, 6)
        : [];

    // Jobs shown in main area (filtered by category)
    const filtered = selectedCategory === 'All'
        ? jobs
        : jobs.filter(job => job.category === selectedCategory);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            setShowDropdown(false);
            router.visit(route('jobposts.index', { search: search.trim() }));
        }
    };

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between min-h-screen">
            <div className='flex flex-col'>

                {/* Header */}
                <JobseekerHeader jobs={jobs} />

                <Link
                    href={route('jobposts.index')}
                    className="block bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-700 mb-4"
                >
                    🔍 Apply for Jobs
                </Link>

                <div className="flex mt-4 gap-4">

                    {/* Filter Sidebar */}
                    <div className='w-[30%] flex flex-col bg-red-400 p-4 rounded gap-1'>
                        <span className='font-bold text-white mb-2'>Filter by Category</span>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-left px-3 py-1 rounded text-sm ${
                                    selectedCategory === cat
                                        ? 'bg-white text-red-500 font-bold'
                                        : 'text-white hover:bg-red-300'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Job Posts */}
                    <div className='w-[70%] bg-blue-400 p-4 rounded flex flex-col gap-3'>
                        {filtered.length === 0 ? (
                            <p className="text-white">No job posts found.</p>
                        ) : (
                            filtered.map(job => (
                                <div key={job.id} className="bg-white rounded p-4 shadow flex items-start justify-between">
                                    <div className="flex-1 flex flex-col pr-4 gap-y-2 bg-green-400 flex-col ">
                                        <h3 className="font-bold text-lg">{job.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {job.recruiter?.name} · {job.location} · {job.salary_range}
                                        </p>
                                        <span>
                                            <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-1">
                                            {job.category}
                                        </span>
                                        </span>
                                        <p className="text-sm mt-2 text-gray-600">
                                            {job.description?.length > 250
                                                ? job.description.substring(0, 250) + '...'
                                                : job.description}
                                        </p>
                                    </div>
                                    <Link
                                        href={route('jobposts.show', job.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 shrink-0"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}