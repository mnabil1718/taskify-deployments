"use client";

import { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { useAppDispatch } from "@/store/hooks";
import { fetchNotificationsAsync } from "@/store/slices/notificationSlice";

/** 
 * Thin client-side wrapper that mounts the Supabase realtime
 * notifications subscription and performs the initial fetch.
 * Drop this anywhere inside the dashboard layout tree.
 */
export function NotificationsListener() {
    const dispatch = useAppDispatch();
    useNotifications();

    useEffect(() => {
        // Initial fetch of notifications to populate unread count/red dot on dashboard load
        dispatch(fetchNotificationsAsync());
    }, [dispatch]);

    return null;
}
