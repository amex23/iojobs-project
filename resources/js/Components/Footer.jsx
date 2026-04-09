

import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { unreadCount } = usePage().props;

    return (
                
                <div className="text-center text-sm text-gray-500 pb-0">
                        IOJobs &copy; {new Date().getFullYear()} - Crafted with{' '}
                        <span role="img" aria-label="Love">
                            ❤️
                        </span>{' '}
                        by the IOJobs team.
                        &nbsp;<a href="">Contact Us </a>
                </div>
    
    );
}