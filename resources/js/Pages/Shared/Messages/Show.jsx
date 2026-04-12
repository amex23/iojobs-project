import { useForm, usePage, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';

export default function Show({ thread }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({ body: '' });

    const isMe = (id) => id === auth.user.id;
    const otherPerson = isMe(thread.sender_id) ? thread.recipient : thread.sender;

    const backRoute = auth.user.role === 'jobseeker'
        ? route('jobseeker.messages.index')
        : auth.user.role === 'jobrecruiter'
        ? route('recruiter.messages.index')
        : route('admin.dashboard');

    const submit = () => {
        post(route('messages.reply', thread.id), {
            onSuccess: () => reset(),
        });
    };

    return (
    <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between min-h-screen gap-y-5">    

        <div className="w-full">
        <JobseekerHeader jobs={[]} />
            <div className='justify-start w-full flex'>
                <div className="w-1/2 mt-4 shadow-md px-7 py-7 rounded-lg bg-white border-gray-300">
            {/* Header */}
            <div className="mb-6">
                {/* <Link href={backRoute} className="text-sm text-gray-500 underline">
                    ← Back to Messages
                </Link> */}
                <h1 className="text-xl font-bold mt-2">{thread.job_post?.title}</h1>
                <p className="text-sm text-gray-500">With: {otherPerson?.name}</p>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6">
                {thread.messages.map(message => {
                    const mine = isMe(message.sender_id);
                    return (
                        <div
                            key={message.id}
                            className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-sm px-4 py-3 rounded-2xl text-sm ${
                                    mine
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                            >
                                {!mine && (
                                    <p className="text-xs font-semibold mb-1 text-gray-500">
                                        {message.sender?.name}
                                    </p>
                                )}
                                <p>{message.body}</p>
                                <p className={`text-xs mt-1 ${mine ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {new Date(message.created_at).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Reply box */}
            <div className="border-t pt-4">
                <textarea
                    className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                    placeholder="Write a reply..."
                    value={data.body}
                    onChange={e => setData('body', e.target.value)}
                />
                {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                <button
                    onClick={submit}
                    disabled={processing}
                    className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Sending...' : 'Send Reply'}
                </button>
            </div>
                </div>
            </div>
        </div>

        <Footer className="mt-7" />
    </div>            

    );
}