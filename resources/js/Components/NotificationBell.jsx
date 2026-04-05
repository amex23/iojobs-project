import { Link, usePage } from '@inertiajs/react';

export default function NotificationBell() {
    const { unreadCount } = usePage().props;

    return (
        <Link href={route('notifications.index')} className="relative inline-flex items-center">
            <span className='bg-blue-400 flex items-center px-4 gap-2 py-2 rounded-md text-sm text-white'>
                Message
                
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {/* <span className="text-2xl z-[99]">🔔</span> */}
                        {unreadCount}
                    </span>
                )}
            </span>
            
        </Link>
    );
}