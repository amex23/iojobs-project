import { useForm, Link } from '@inertiajs/react';
import RecruiterHeader from '@/Components/RecruiterHeader';
import Footer from '@/Components/Footer';

export default function ContactAdmin({ admin }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        body: '',
    });

    const submit = () => {
        post(route('recruiter.contact.admin.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl min-h-screen flex flex-col gap-y-5">
            <RecruiterHeader />

            <div className="flex flex-col items-start">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-2">📬 Contact Admin</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Send a message directly to the IOJobs admin team.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Write your message here..."
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413] resize-none"
                            />
                            {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                        </div>

                        <button
                            onClick={submit}
                            disabled={processing}
                            className="w-full bg-[#141413] text-white font-bold py-3 rounded-lg hover:bg-[#2e2e2e] transition text-sm disabled:opacity-50"
                        >
                            {processing ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    <div className="mt-4">
                        <Link href={route('recruiter.dashboard')} className="text-sm text-gray-500 underline">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}