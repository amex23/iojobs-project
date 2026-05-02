import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex px-5 min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className='flex justify-center'>
             
                 <Link href="/" className='flex items-center gap-1'>
                                <img className="w-9 h-9 rounded-md" src="/io-logo2.png" alt="" />
                                <h1 className='font-bold text-2xl text-black'>
                                    jobs
                                </h1>
                 </Link>
              
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md rounded-md">
                {children}
            </div>
        </div>
    );
}
