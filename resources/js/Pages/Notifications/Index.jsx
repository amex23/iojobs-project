import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';
import RecruiterHeader from '@/Components/RecruiterHeader';
import AllHeader from '@/Components/AllHeader';

export default function Index({ notifications }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;
    const totalPages = Math.ceil(notifications.length / perPage);
    const paginated = notifications.slice((currentPage - 1) * perPage, currentPage * perPage);

    const dashboardRoute = role === 'admin'
        ? route('admin.dashboard')
        : role === 'jobrecruiter'
        ? route('recruiter.dashboard')
        : route('jobseeker.dashboard');

    const markRead = (id) => {
        router.patch(route('notifications.read', id));
    };

    const markAllRead = () => {
        router.patch(route('notifications.readAll'));
    };

    return (
    <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between gap-y-5">    
        <div className='flex w-full flex-col gap-y-5 min-h-[80vh]'>
            {role === 'admin' && <AllHeader jobs={[]} />}
            {role === 'jobseeker' && <JobseekerHeader jobs={[]} />}
            {role === 'jobrecruiter' && <RecruiterHeader />}
            <div className="w-full mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">✉️ Messages</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={markAllRead}
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            Mark all as read
                        </button>
                        <Link href={dashboardRoute} className="text-sm text-gray-500 underline">
                            ← Dashboard
                        </Link>
                    </div>
                </div>

                {notifications.length === 0 ? (
                    <p className="text-gray-500">No notifications yet.</p>
                ) : (
                    <>
                        <div className="space-y-3 shadow-md bg-white py-7 px-5 rounded-sm">
                            {paginated.map(notif => (
                                <div
                                    key={notif.id}
                                    className={`lg:w-1/3 border rounded-lg p-4 ${!notif.read_at ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold">{notif.data.title}</p>
                                            <p className="text-sm text-gray-600 mt-1">{notif.data.body ?? notif.data.preview}</p>
                                            {notif.data.url && (
                                                    <Link
                                                        href={(() => {
                                                            try {
                                                                return new URL(notif.data.url).pathname;
                                                            } catch {
                                                                return notif.data.url;
                                                            }
                                                        })()}
                                                        className="text-xs text-blue-600 underline mt-1 inline-block"
                                                    >
                                                        View →
                                                    </Link>
                                                )}
                                            <p className="text-xs text-gray-400 mt-2">
                                                {new Date(notif.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        {!notif.read_at && (
                                            <button
                                                onClick={() => markRead(notif.id)}
                                                className="text-xs text-blue-600 underline ml-4 whitespace-nowrap"
                                            >
                                                Mark read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-start gap-2 mt-6">
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
                                                ? 'bg-[#474747] text-white'
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
        <Footer />
    </div>    
    );
}