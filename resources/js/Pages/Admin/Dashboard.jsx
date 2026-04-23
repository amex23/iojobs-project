import { Link } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';
import Footer from '@/Components/Footer';

export default function Dashboard() {
    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl h-screen flex flex-col justify-between h-screen">
            <div className='flex flex-col'>
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

                <div className="rounded-sm bg-white shadow-md h-[500px] py-12 flex items-start gap-x-5 justify-center w-full flex-col lg:flex-row gap-5 lg:gap-0 px-5 lg:gap-5 lg:px-0">
                    <Link
                        href={route('admin.jobs.index')}
                        className="w-full lg:w-auto block bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
                    >
                        📋 Review Job Posts
                    </Link>
                    <Link
                        href={route('jobposts.index')}
                        className="w-full lg:w-auto block bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-700"
                    >
                        🌐 View All Approved Jobs
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className="w-full lg:w-auto block bg-[#9CCAF0] text-white px-4 py-3 rounded hover:bg-[#76AFDE]"
                    >
                        🪪 Update Account/Profile 
                    </Link>

                    <Link
                        href={route('admin.users.index')}
                        className="w-full lg:w-auto block bg-indigo-600 text-white px-4 py-3 rounded hover:bg-indigo-700"
                    >
                        👥 See All Users
                    </Link>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}