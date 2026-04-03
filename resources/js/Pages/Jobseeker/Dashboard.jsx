import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Jobseeker Dashboard 👷</h1>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}