import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion, featuredJobs = [] }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head>
                <title>IOJobs - Online Jobs Philippines | Hire Remote Professionals</title>
                <meta name="description" content="IOJobs is the top online job portal in the Philippines. Connect employers with skilled Filipino remote professionals, virtual assistants, and workers." />
                <meta name="keywords" content="online jobs philippines, remote jobs philippines, virtual assistant philippines, hire filipino workers, work from home philippines, iojobs" />
                <meta name="author" content="IOJobs" />
                <meta property="og:title" content="IOJobs - Online Jobs Philippines" />
                <meta property="og:description" content="Find and hire top remote talent in the Philippines." />
                <meta property="og:url" content="https://iojobs.net" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="IOJobs - Online Jobs Philippines" />
                <meta name="twitter:description" content="Find and hire top remote talent in the Philippines." />
            </Head>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#e5e7eb] selection:text-black">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex lg:grid items-center gap-2 py-10 lg:grid-cols-3">
                            <div>
                                <h1 className='font-bold text-2xl text-black'>IOJobs</h1>
                            </div>
                            <div className="flex lg:col-start-2 lg:justify-center"></div>
                            <nav className="flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] text-gray-500 dark:hover:text-white/80 dark:focus-visible:ring-white mr-2"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-[#141413] font-bold text-white text-sm hover:bg-[#141413]/80 py-2 px-5 rounded-md flex items-center justify-center"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

                                {/* Left Panel - Hero */}
                                <div className="flex flex-col items-start gap-6 overflow-visible rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">

                                    {/* Hero Text */}
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <div className='flex flex-col text-center lg:text-start gap-y-5 lg:gap-y-28'>
                                            <h1 className="pd text-black text-4xl xl:text-6xl">
                                                Hire the best
                                                Remote/Local Professionals in the Philippines
                                            </h1>
                                            <span className='hidden lg:flex w-full justify-between lg:bg-[#141413] text-white px-4 py-3 rounded-lg lg:flex-ro'>
                                                <span className='flex flex-row text-2xl font-bold'>• Talent</span>
                                                <span className='text-2xl font-bold'>• Teamwork</span>
                                                <span className='text-2xl font-bold'>• Success</span>
                                            </span>
                                        </div>
                                        <img
                                            src="https://laravel.com/assets/img/welcome/docs-dark.svg"
                                            alt="Laravel documentation screenshot"
                                            className="hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                                        />
                                    </div>

                                    {/* 3 Icons Row */}
                                    <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-4 mt-4">

                                        {/* About Us */}
                                        <div className="flex flex-col items-center gap-2 w-full lg:w-1/3">
                                            <div className="flex w-full justify-center">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#474747]/10 sm:size-16">
                                                    <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <g fill="#141413">
                                                            <path d="M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" />
                                                            <path d="M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" />
                                                            <path d="M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="flex justify-center text-center w-full">
                                                <h2 className="text-lg font-semibold text-black dark:text-white">About Us</h2>
                                            </span>
                                            <p className="text-sm text-gray-500 text-center">Learn more about IOJobs and our mission in the Philippines.</p>
                                        </div>

                                        {/* Why IOJobs */}
                                        <div className="flex flex-col items-center gap-2 w-full lg:w-1/3">
                                            <div className="flex justify-center w-full">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#474747]/10 sm:size-16">
                                                    <span className="text-3xl font-bold text-[#141413]">?</span>
                                                </div>
                                            </div>
                                            <span className="w-full text-center">
                                                <h2 className="text-lg font-semibold text-black dark:text-white">Why IOJobs</h2>
                                            </span>
                                            <p className="text-sm text-gray-500 text-center">Top remote talent in the Philippines, ready to work for you.</p>
                                        </div>

                                        {/* Get Hired */}
                                        <div className="flex flex-col items-center gap-2 w-full lg:w-1/3">
                                            <div className="flex justify-center w-full">
                                                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#474747]/10 sm:size-16">
                                                    <svg className="size-6 sm:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#141413">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="flex justify-center w-full">
                                                <h2 className="text-lg font-semibold text-black dark:text-white">Get Hired</h2>
                                            </span>
                                            <p className="text-sm text-gray-500 text-center">Find your dream job today and connect with top employers.</p>
                                        </div>

                                    </div>
                                </div>

                                {/* Featured Job Cards */}
                                {featuredJobs.map(job => (
                                    <div key={job.id} className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 flex-col lg:flex-row">
                                        <div className="pt-3 sm:pt-5 w-full lg:w-[75%]">
                                            <h2 className="text-xl font-semibold dark:text-white">{job.title}</h2>
                                            <p className="text-xs text-gray-400 mt-1">{job.recruiter?.name} · {job.location}</p>
                                            <p className="mt-4 text-sm/relaxed text-gray-600">
                                                {job.description?.length > 150
                                                    ? job.description.substring(0, 150) + '...'
                                                    : job.description}
                                            </p>
                                        </div>
                                        <Link
                                            href={route('login')}
                                            className='self-center lg:self-start lg:mt-5 w-auto lg:w-[25%] flex bg-[#141413] justify-center items-center py-2 text-white font-bold gap-2 px-4 lg:px-2 rounded-md'
                                        >
                                            <span className='text-sm md:text-md'>Apply Now</span>
                                            <svg className="size-6 shrink-0 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                            </svg>
                                        </Link>
                                    </div>
                                ))}

                                {/* Placeholder cards */}
                                {Array.from({ length: Math.max(0, 3 - featuredJobs.length) }).map((_, i) => (
                                    <div key={`placeholder-${i}`} className="flex items-center justify-center rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:ring-black/20 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 min-h-[120px]">
                                        <p className="text-gray-400 text-sm">More jobs coming soon...</p>
                                    </div>
                                ))}

                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-gray-500">
                            IOJobs &copy; {new Date().getFullYear()} - Crafted with{' '}
                            <span role="img" aria-label="Love">❤️</span>{' '}
                            by the IOJobs team.
                            &nbsp;<Link href={route('contact-us')}>Contact Us</Link>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}