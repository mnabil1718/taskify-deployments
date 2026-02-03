import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { config } from '../utils/config.js'
import type { Database } from '../../database.types.js';


// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(config.supabase.site_url!, config.supabase.key!, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
});

// auth-aware. easier to work with RLS
export function authClientFactory(accessToken?: string): SupabaseClient<Database> {

    return createClient<Database>(
        config.supabase.site_url!,
        config.supabase.key!,
        {
            global: {
                headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
            },
            auth: {
                persistSession: false,
            },
        }
    );

};
