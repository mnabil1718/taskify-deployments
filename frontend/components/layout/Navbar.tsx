'use client';

import { User, Menu } from 'lucide-react';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { NotificationPopover } from './NotificationPopover';

export function Navbar() {
    const { toggle } = useSidebar();

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 backdrop-blur-xl transition-all">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggle}
                    className="mr-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
                >
                    <Menu size={24} />
                </button>
            </div>

            <div className="flex items-center gap-4">
                <NotificationPopover />

                <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 ring-2 ring-white shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <User size={18} />
                    </div>
                </div>
            </div>
        </header>
    );
}
