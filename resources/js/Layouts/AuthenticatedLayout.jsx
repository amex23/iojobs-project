import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AllHeader from '@/Components/AllHeader';
import JobseekerHeader from '@/Components/JobseekerHeader';
import RecruiterHeader from '@/Components/RecruiterHeader';
import Footer from '@/Components/Footer';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between min-h-screen">
            

            <div className="relative w-full flex justify-center">
                <div className="w-full max-w-2xl px-0 lg:px-6 lg:max-w-7xl">
                    {user.role === 'admin' && <AllHeader />}
                    {user.role === 'jobseeker' && <JobseekerHeader jobs={[]} />}
                    {user.role === 'jobrecruiter' && <RecruiterHeader />}
                </div>
            </div>

            {header && (
                <header className="bg-white shadow">
                    {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div> */}
                </header>
            )}

            <div className="relative w-full flex justify-center">
                <div className="w-full max-w-2xl px-0 lg:px-6 lg:max-w-7xl">
                    <Link 
                        href={
                            user.role === 'admin'
                                ? route('admin.dashboard')
                                : user.role === 'jobrecruiter'
                                ? route('recruiter.dashboard')
                                : route('jobseeker.dashboard')
                        } 
                        className="flex items-center gap-1 text-sm text-gray-500 underline"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>

            <main>{children}</main>
        </div>
    );
}
