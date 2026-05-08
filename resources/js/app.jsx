import '../css/app.css';
import './bootstrap';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function LoadingScreen() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(d => d.length >= 3 ? '' : d + '.');
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
            <div className='flex items-center gap-1'>
                <img className="w-9 h-9 rounded-md" src="/io-logo2.png" alt="IOJobs Logo" />
                <h1 className='font-bold text-2xl text-black'>
                    jobs<span className="tracking-widest">{dots}</span>
                </h1>
            </div>
        </div>
    );
}

function AppWrapper({ App, props }) {
    const [loading, setLoading] = useState(false);
    const isOnAuthPage = useRef(false);

    useEffect(() => {
        // Track if currently on login or register
        const checkAuthPage = () => {
            const path = window.location.pathname;
            isOnAuthPage.current = path === '/login' || path === '/register';
        };

        checkAuthPage();

        const unsubscribeStart = router.on('start', () => {
            if (isOnAuthPage.current) {
                setLoading(true);
            }
        });

        const unsubscribeFinish = router.on('finish', () => {
            checkAuthPage();
            // Always hide loading after navigation finishes
            setTimeout(() => setLoading(false), 1000);
        });

        return () => {
            unsubscribeStart();
            unsubscribeFinish();
        };
    }, []);

    return (
        <>
            {loading && <LoadingScreen />}
            <App {...props} />
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});