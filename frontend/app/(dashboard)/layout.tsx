import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { AuthGuard } from '@/components/providers/AuthGuard';
import { SidebarProvider } from '@/components/providers/SidebarProvider';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <div className="flex min-h-screen bg-transparent">
                    <Sidebar />
                    <div className="flex flex-1 flex-col transition-all duration-300 md:pl-64">
                        <Navbar />
                        <main className="flex-1 p-4 md:p-6 relative overflow-x-hidden">
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
                            <div className="h-full animate-in fade-in zoom-in duration-500 relative z-10">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </AuthGuard>
    );
}
