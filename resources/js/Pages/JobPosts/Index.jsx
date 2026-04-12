import { Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import JobseekerHeader from '@/Components/JobseekerHeader';

export default function Index({ jobs }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const dashboardRoute = role === 'admin'
        ? route('admin.dashboard')
        : role === 'jobrecruiter'
        ? route('recruiter.dashboard')
        : route('jobseeker.dashboard');

    return (

    <div className="px-12 py-12 max-w-2xl mx-auto lg:max-w-7xl h-screen flex flex-col justify-between h-screen">    
        <div className="flex flex-col w-full">
            <JobseekerHeader jobs={jobs} />
        <div className="w-full mx-auto mt-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">All Jobs</h1>
                <Link href={dashboardRoute} className="text-sm text-gray-500 underline">
                    ← Dashboard
                </Link>
            </div>

            {jobs.length === 0 ? (
                <p className="text-gray-500">No approved jobs available.</p>
            ) : (
                <div className="space-y-4 w-1/3">
                    {jobs.map(job => (
                        <div key={job.id} className="border rounded-lg p-5 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{job.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {job.recruiter.name} · {job.location} · {job.salary_range}
                                    </p>
                                    <p className="text-sm text-gray-400">{job.category}</p>
                                </div>
                                <Link
                                    href={route('jobposts.show', job.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
        <Footer></Footer>    
    </div>        
    );
}