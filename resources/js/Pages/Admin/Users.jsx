import { Link } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';
import Footer from '@/Components/Footer';

export default function Users({ recruiters, jobseekers }) {
    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl min-h-screen flex flex-col gap-y-5">
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Admin Dashboard 🛡️</h1>
                    <div className="flex items-center gap-4">
                        <NotificationBell />
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">👥 All Users</h2>
                    <Link href={route('admin.dashboard')} className="text-sm text-gray-500 underline">
                        ← Dashboard
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recruiters */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-bold mb-1">
                            Job Recruiters
                            <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                {recruiters.length}
                            </span>
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">Registered recruiters on IOJobs</p>

                        {recruiters.length === 0 ? (
                            <p className="text-gray-400 text-sm">No recruiters yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {recruiters.map(user => (
                                    <div key={user.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                            Recruiter
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Jobseekers */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-bold mb-1">
                            Job Seekers
                            <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                {jobseekers.length}
                            </span>
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">Registered job seekers on IOJobs</p>

                        {jobseekers.length === 0 ? (
                            <p className="text-gray-400 text-sm">No job seekers yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {jobseekers.map(user => (
                                    <div key={user.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
                                            Job Seeker
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}