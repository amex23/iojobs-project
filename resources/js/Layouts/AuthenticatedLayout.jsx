import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AllHeader from '@/Components/AllHeader';
import Footer from '@/Components/Footer';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between min-h-screen">
            

            <div className="relative w-full flex justify-center">
                <div className="w-full max-w-2xl px-6 lg:max-w-7xl">
                    <AllHeader></AllHeader>
                </div>
            </div>

            {header && (
                <header className="bg-white shadow">
                    {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div> */}
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
