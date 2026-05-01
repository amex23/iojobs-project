import { Head, Link, useForm } from '@inertiajs/react';

export default function ContactUs() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact Us" />
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
                    <Link href="/">
                        <h1 className="font-bold text-2xl text-[#141413]">IOJobs</h1>
                    </Link>
                    <Link href="/" className="text-sm text-gray-500 underline">
                        ← Back to Home
                    </Link>
                </header>

                <main className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-lg">
                        <h2 className="text-3xl font-bold text-[#141413] mb-2">Contact Us</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Have a question or concern? We'd love to hear from you.
                        </p>

                        {recentlySuccessful && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                                ✅ Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Juan dela Cruz"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="juan@example.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                    placeholder="How can we help?"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                                    required
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows={5}
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    placeholder="Write your message here..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413] resize-none"
                                    required
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#141413] text-white font-bold py-3 rounded-lg hover:bg-[#2e2e2e] transition text-sm disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        <div className="mt-8 border-t pt-6 text-sm text-gray-500 space-y-1">
                            <p>📧 <span className="font-medium">support@iojobs.net</span></p>
                            <p>📍 <span className="font-medium">Philippines</span></p>
                        </div>
                    </div>
                </main>

                <footer className="py-6 text-center text-sm text-gray-400">
                    IOJobs &copy; {new Date().getFullYear()} — Crafted with ❤️ by the IOJobs team.
                </footer>
            </div>
        </>
    );
}