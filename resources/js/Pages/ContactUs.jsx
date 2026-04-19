import { Head, Link } from '@inertiajs/react';

export default function ContactUs() {
    return (
        <>
            <Head title="Contact Us" />
            <div className="bg-gray-50 min-h-screen flex flex-col">

                {/* Header */}
                <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
                    <Link href="/">
                        <h1 className="font-bold text-2xl text-[#141413]">IOJobs</h1>
                    </Link>
                    <Link href="/" className="text-sm text-gray-500 underline">
                        ← Back to Home
                    </Link>
                </header>

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-lg">
                        <h2 className="text-3xl font-bold text-[#141413] mb-2">Contact Us</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Have a question or concern? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Juan dela Cruz"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="juan@example.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141413] resize-none"
                                />
                            </div>

                            <button
                                className="w-full bg-[#141413] text-white font-bold py-3 rounded-lg hover:bg-[#2e2e2e] transition text-sm"
                            >
                                Send Message
                            </button>
                        </div>

                        <div className="mt-8 border-t pt-6 text-sm text-gray-500 space-y-1">
                            <p>📧 <span className="font-medium">support@iojobs.ph</span></p>
                            <p>📍 <span className="font-medium">Philippines</span></p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-sm text-gray-400">
                    IOJobs &copy; {new Date().getFullYear()} — Crafted with ❤️ by the IOJobs team.
                </footer>
            </div>
        </>
    );
}