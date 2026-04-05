import { Link, router, usePage } from '@inertiajs/react';

export default function Index({ notifications }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const dashboardRoute = role === 'admin'
        ? route('admin.dashboard')
        : role === 'jobrecruiter'
        ? route('recruiter.dashboard')
        : route('jobseeker.dashboard');

    const markRead = (id) => {
        router.patch(route('notifications.read', id));
    };

    const markAllRead = () => {
        router.patch(route('notifications.readAll'));
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">✉️ Messages</h1>
                <div className="flex gap-3">
                    <button
                        onClick={markAllRead}
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                        Mark all as read
                    </button>
                    <Link href={dashboardRoute} className="text-sm text-gray-500 underline">
                        ← Dashboard
                    </Link>
                </div>
            </div>

            {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications yet.</p>
            ) : (
                <div className="space-y-3">
                    {notifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`border rounded-lg p-4 ${!notif.read_at ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{notif.data.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{notif.data.body ?? notif.data.preview}</p>
                                    {notif.data.url && (
                                        <Link
                                            href={notif.data.url}
                                            className="text-xs text-blue-600 underline mt-1 inline-block"
                                        >
                                            View →
                                        </Link>
                                    )}
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(notif.created_at).toLocaleString()}
                                    </p>
                                </div>
                                {!notif.read_at && (
                                    <button
                                        onClick={() => markRead(notif.id)}
                                        className="text-xs text-blue-600 underline ml-4 whitespace-nowrap"
                                    >
                                        Mark read
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}