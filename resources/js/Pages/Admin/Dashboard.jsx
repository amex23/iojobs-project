import { Link } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';

export default function Dashboard() {
    return (
        <div className="p-8 max-w-2xl mx-auto">
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

            <div className="space-y-3">
                <Link
                    href={route('admin.jobs.index')}
                    className="block bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
                >
                    📋 Review Job Posts
                </Link>
                <Link
                    href={route('jobposts.index')}
                    className="block bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-700"
                >
                    🌐 View All Approved Jobs
                </Link>
                 <Link
                    href={route('profile.edit')}
                    className="block bg-[#9CCAF0] text-white px-4 py-3 rounded hover:bg-[#76AFDE]"
                >
                    🪪 Update Account/Profile 
                </Link>
            </div>
        </div>
    );
}