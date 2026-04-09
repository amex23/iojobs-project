import { Link } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';
import Footer from '@/Components/Footer';

export default function Dashboard() {
    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl h-screen flex flex-col justify-between h-screen">
            <div className='flex flex-col'>
                <div className="flex items-center justify-between mb-6">
              
                <span className='flex items-center gap-x-4'>
                    <h2 className="font-bold text-2xl text-gray">IOJobs</h2>
                    <input className='rounded-xl w-full border-gray-300' type="text" placeholder='Search a job..' />
                </span>
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

                <Link
                        href={route('jobposts.index')}
                        className="block bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-700"
                    >
                        🔍 Apply for Jobs
                </Link>
                <div className="flex mt-4">

                    <div className='w-[30%] flex flex-col bg-red-400'>
                        <span className='mb-3'>Filter</span>
                        <span>Accounting</span>
                    </div>

                    <div className='w-[70%] flex bg-blue-400'>
                        <a href="">Accounting</a>
                    </div>
                    
                   
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}