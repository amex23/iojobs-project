import { Link, usePage } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';
import Footer from '@/Components/Footer';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl min-h-screen flex flex-col gap-y-5">
          
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Recruiter Dashboard </h1>
                    <div className="flex items-center gap-4">
                        <NotificationBell />
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-white px-4 py-2 rounded text-sm bg-[#474747] hover:bg-[#3B3B3B]"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                <p className="mb-4 text-lg">Hi, <span className="font-bold">{auth.user.name.split(' ')[0]}</span> 👋</p>

                <div className="rounded-sm bg-white shadow-md h-[500px] py-12 flex items-start gap-x-5 justify-center w-full flex-col lg:flex-row gap-5 lg:gap-0 px-5 lg:gap-5 lg:px-0">
                    <Link
                        href={route('recruiter.jobs.index')}
                        className="block text-white px-4 py-3 rounded bg-[#474747] hover:bg-[#3B3B3B] w-full lg:w-auto"
                    >
                        📄 My Job Posts
                    </Link>
                    <Link
                        href={route('recruiter.jobs.create')}
                        className="block text-white px-4 py-3 rounded bg-[#474747] hover:bg-[#3B3B3B] w-full lg:w-auto"
                    >
                        ➕ Post a New Job
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className="block text-white px-4 py-3 rounded bg-[#474747] hover:bg-[#3B3B3B] w-full lg:w-auto"
                    >
                        🪪 Update Account/Profile
                    </Link>

                    <Link
                        href={route('recruiter.jobs.all')}
                        className="block text-white px-4 py-3 rounded bg-[#474747] hover:bg-[#3B3B3B] w-full lg:w-auto"
                    >
                        🔍 See All Jobs
                    </Link>

                    <Link
                        href={route('recruiter.contact.admin')}
                        className="block text-white px-4 py-3 rounded bg-[#474747] hover:bg-[#3B3B3B] w-full lg:w-auto"
                    >
                        📬 Contact Admin
                    </Link>
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}