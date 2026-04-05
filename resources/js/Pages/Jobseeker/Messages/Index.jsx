import { Link } from '@inertiajs/react';

export default function Index({ threads }) {
    return (
        <div className="p-8 max-w-3xl mx-auto">
           
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-6">My Messages</h1>
                <Link href={route('jobseeker.dashboard')} className="text-sm text-gray-500 underline">
                    ← Dashboard
                </Link>
            </div>

            {threads.length === 0 ? (
                <p className="text-gray-500">No messages yet.</p>
            ) : (
                <div className="space-y-3">
                    {threads.map(thread => (
                        <Link
                            key={thread.id}
                            href={route('messages.show', thread.id)}
                            className="block border rounded-lg p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{thread.job_post?.title}</p>
                                    <p className="text-sm text-gray-500">To: {thread.recipient?.name}</p>
                                    {thread.latest_message && (
                                        <p className="text-sm text-gray-400 mt-1 truncate">
                                            {thread.latest_message.body}
                                        </p>
                                    )}
                                </div>

                                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                                    {new Date(thread.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}