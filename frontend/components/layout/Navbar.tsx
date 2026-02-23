'use client';

import { Menu } from 'lucide-react';
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

                <div className="hidden md:flex md:items-center">
                    <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/50">
                        Ready to get things done?
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationPopover />
            </div>
        </header>
    );
}
