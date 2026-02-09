'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            // Redirect to login if no token found
            router.push('/login');
        } else {
            // Authorized
            setAuthorized(true);
        }
    }, [router]);

    // Show nothing while checking auth to prevent flash of content
    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}
