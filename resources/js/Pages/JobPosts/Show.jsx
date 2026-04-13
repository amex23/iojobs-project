import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';


export default function Show({ job }) {
    const { auth } = usePage().props;
    const isJobseeker = auth.user.role === 'jobseeker';
    const [composing, setComposing] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        job_post_id: job.id,
        body: '',
    });

    const sendMessage = () => {
        post(route('jobseeker.messages.store'), {
            onSuccess: () => {
                reset();
                setComposing(false);
            },
        });
    };

    return (
        <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl flex flex-col justify-between min-h-screen">

            <div className="flex flex-col w-full">
                <JobseekerHeader jobs={[]} />
                <div className="flex flex-col items-start">
                <Link href={route('jobseeker.dashboard')} className="text-sm text-gray-500 underline">
                ← Back to Jobs
            </Link>

                <div className="flex justify-start w-full">
                    <div className="mt-6 shadow-md bg-white p-7 rounded-sm w-1/2">
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <p className="text-gray-500 mt-2">
                        Posted by <span className="font-medium">{job.recruiter.name}</span>
                    </p>

                    <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        {job.location && <span>📍 {job.location}</span>}
                        {job.salary_range && <span>💰 {job.salary_range}</span>}
                        {job.category && <span>🏷️ {job.category}</span>}
                    </div>

                    <div className="mt-6">
                        <p className="whitespace-pre-line text-gray-700">{job.description}</p>
                    </div>

                    {isJobseeker && (
                        <div className="mt-8">
                            {!composing ? (
                                <button
                                    onClick={() => setComposing(true)}
                                    className="text-white px-6 py-3 rounded-lg bg-black hover:bg-gray-600 font-medium"
                                >
                                    📧 Message Recruiter
                                </button>
                            ) : (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Message to <span className="text-green-600">{job.recruiter.name}</span>
                                    </p>
                                    <textarea
                                        className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                                        rows={4}
                                        placeholder="Write your message to the recruiter..."
                                        value={data.body}
                                        onChange={e => setData('body', e.target.value)}
                                    />
                                    {errors.body && (
                                        <p className="text-red-500 text-xs mt-1">{errors.body}</p>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={sendMessage}
                                            disabled={processing}
                                            className="bg-black hover:bg-gray-600 text-white px-5 py-2 rounded-lg text-sm  disabled:opacity-50"
                                        >
                                            {processing ? 'Sending...' : '✉️ Send Message'}
                                        </button>
                                        <button
                                            onClick={() => { setComposing(false); reset(); }}
                                            className="px-5 py-2 rounded-lg text-sm border hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
            
            
            <Footer />
        </div>
    );
}