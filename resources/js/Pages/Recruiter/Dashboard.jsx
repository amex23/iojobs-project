import { Link } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';
import Footer from '@/Components/Footer';

export default function Dashboard() {
    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl h-screen flex flex-col justify-between h-screen">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Recruiter Dashboard 👷</h1>
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

                <div className="flex items-center gap-x-5 justify-center w-full">
                    <Link
                        href={route('recruiter.jobs.index')}
                        className="block bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
                    >
                        📄 
                        My Job Posts
                    </Link>
                    <Link
                        href={route('recruiter.jobs.create')}
                        className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700"
                    >
                        ➕ 
                        Post a New Job
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className="block bg-[#9CCAF0] text-white px-4 py-3 rounded hover:bg-[#76AFDE]"
                    >
                        🪪 
                        Update Account/Profile 
                    </Link>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}