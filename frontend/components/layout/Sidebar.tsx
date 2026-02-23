'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const navItems = [
    { icon: LayoutDashboard, label: 'Board', href: '/dashboard' }
];

import { useSidebar } from '@/components/providers/SidebarProvider';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isOpen, close } = useSidebar();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
        router.push('/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={close}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-900 text-white shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Background Decor */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/20 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between px-3 py-4">
                    <div>
                        <div className="mb-8 flex items-center px-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 text-white">
                                <LayoutDashboard size={24} />
                            </div>
                            <span className="ml-3 text-xl font-bold tracking-tight text-white">
                                Taskify
                            </span>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <div
                                        key={item.href}
                                        className={cn(
                                            'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                            isActive
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        )}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => window.innerWidth < 768 && close()}
                                            className="flex flex-1 items-center"
                                        >
                                            <item.icon
                                                size={20}
                                                className={cn(
                                                    'mr-3 transition-colors',
                                                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'
                                                )}
                                            />
                                            {item.label}
                                        </Link>
                                    </div>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto pt-6 px-3 flex flex-col gap-4">
                        {/* Sign Out Button */}
                        <button
                            onClick={handleLogout}
                            className="group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                        >
                            <LogOut size={20} className="mr-3 text-slate-500 group-hover:text-red-400" />
                            Sign Out
                        </button>

                        {/* Professional Footer */}
                        <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-800/50">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                Taskify v1.0
                            </p>
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                                &copy; 2026 Taskify. All rights reserved.
                            </p>
                            <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-800/50">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                <p className="text-[10px] font-medium text-slate-400">
                                    Developed by <span className="text-indigo-400">Taskify Team</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
