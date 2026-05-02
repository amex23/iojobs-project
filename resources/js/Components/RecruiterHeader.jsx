import { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import NotificationBell from '@/Components/NotificationBell';

export default function RecruiterHeader({ jobs = [] }) {
    
    return (
        <div className="flex items-center justify-between mb-6">
            {/* <span className='flex items-center gap-x-4 w-full mr-4'>
                <a className="font-bold text-2xl text-black shrink-0" href={route('recruiter.dashboard')} >IOJobs</a>
            </span> */}

            <a className='flex items-center gap-1' href={route('recruiter.dashboard')} >
                    <img className="w-9 h-9 rounded-md" src="/io-logo2.png" alt="" />
                    <h1 className='font-bold text-2xl text-black'>
                        jobs
                    </h1>
            </a>

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