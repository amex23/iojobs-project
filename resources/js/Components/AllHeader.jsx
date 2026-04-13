import { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';

export default function AllHeader ({ jobs = [] }) {
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const suggestions = search.trim().length > 0
        ? jobs.filter(job =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.category?.toLowerCase().includes(search.toLowerCase()) ||
            job.location?.toLowerCase().includes(search.toLowerCase())
          ).slice(0, 6)
        : [];

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            setShowDropdown(false);
            router.visit(route('jobposts.index', { search: search.trim() }));
        }
    };

    return (
        <div className="flex items-center justify-between mb-6">
            <span className='flex items-center gap-x-4 w-full mr-4'>
                <h2 className="font-bold text-2xl text-gray shrink-0">IOJobs</h2>

                {/* <div className="relative w-1/3" ref={searchRef}>
                    <input
                        className='rounded-md w-full border-2 border-gray-300'
                        type="text"
                        placeholder='Search a job..'
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setShowDropdown(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowDropdown(true)}
                    />

                    {showDropdown && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 mt-1 overflow-hidden">
                            {suggestions.map(job => (
                                <Link
                                    key={job.id}
                                    href={route('jobposts.show', job.id)}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <div>
                                        <p className="font-medium text-sm text-gray-800">{job.title}</p>
                                        <p className="text-xs text-gray-400">{job.location} · {job.category}</p>
                                    </div>
                                    <span className="text-xs text-blue-500">View →</span>
                                </Link>
                            ))}
                            <button
                                className="w-full text-center text-sm text-blue-600 py-2 hover:bg-gray-50"
                                onClick={() => {
                                    setShowDropdown(false);
                                    router.visit(route('jobposts.index', { search: search.trim() }));
                                }}
                            >
                                🔍 See all results for "{search}"
                            </button>
                        </div>
                    )}
                </div> */}
            </span>

            <div className="flex items-center gap-4 shrink-0">
                <NotificationBell />
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="bg-[#474747] font-bold text-white px-4 py-2 rounded text-sm hover:bg-[#141413]"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}