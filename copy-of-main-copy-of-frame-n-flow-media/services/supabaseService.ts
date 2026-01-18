import { supabase } from '../supabaseClient';
import { User, GrowthPartnerApplication, PartnerData, OutreachLog } from './mockBackend';

export const SupabaseBackend = {
    // --- Auth ---

    // Login with Email/Password
    login: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !data.user) {
            return { user: null, error: error?.message || 'Login failed' };
        }

        // Fetch Profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        // Fetch Partner ID if partner
        let partnerId = undefined;
        if (profile?.role === 'partner') {
            const { data: partner } = await supabase
                .from('partners')
                .select('id')
                .eq('user_id', data.user.id)
                .single();
            partnerId = partner?.id;
        }

        const user: User = {
            id: data.user.id,
            username: email, // Using email as username
            name: profile?.full_name || email.split('@')[0],
            role: profile?.role as any || 'partner',
            partnerId,
            email: email
        };

        return { user };
    },

    logout: async () => {
        await supabase.auth.signOut();
    },

    // Async version of getCurrentUser
    getCurrentUser: async (): Promise<User | null> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        let partnerId = undefined;
        if (profile?.role === 'partner') {
            const { data: partner } = await supabase
                .from('partners')
                .select('id')
                .eq('user_id', session.user.id)
                .single();
            partnerId = partner?.id;
        }

        return {
            id: session.user.id,
            username: session.user.email || '',
            name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            role: profile?.role as any || 'partner',
            partnerId,
            email: session.user.email
        };
    },

    // --- Public: Apply ---
    submitApplication: async (data: Omit<GrowthPartnerApplication, 'id' | 'status' | 'appliedAt'>) => {
        const { data: result, error } = await supabase
            .from('applications')
            .insert([{ ...data, status: 'pending' }])
            .select()
            .single();

        if (error) throw error;

        // Map back to frontend type
        const app: GrowthPartnerApplication = {
            id: result.id,
            fullName: result.full_name,
            email: result.email,
            phone: result.phone,
            city: result.city,
            background: result.background,
            experience: result.experience,
            reason: result.reason,
            platforms: result.platforms || [],
            status: result.status,
            appliedAt: result.created_at
        };
        return app;
    },

    // --- Admin ---
    getApplications: async (): Promise<GrowthPartnerApplication[]> => {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map(result => ({
            id: result.id,
            fullName: result.full_name,
            email: result.email,
            phone: result.phone,
            city: result.city,
            background: result.background,
            experience: result.experience,
            reason: result.reason,
            platforms: result.platforms || [],
            status: result.status,
            appliedAt: result.created_at
        }));
    },

    reviewApplication: async (appId: string, status: 'approved' | 'rejected') => {
        const { error } = await supabase
            .from('applications')
            .update({ status })
            .eq('id', appId);

        // Note: Actual user creation should be handled via a Backend process or manually in Supabase Dashboard
        // as we cannot safely create other users from the client side without Service Role.
        if (status === 'approved') {
            // Optional: You could trigger an Edge Function here
        }

        return { success: !error };
    },

    getAllPartners: async (): Promise<PartnerData[]> => {
        const { data: partners, error } = await supabase
            .from('partners')
            .select(`
                *,
                outreach_logs (*)
            `);

        if (error || !partners) return [];

        return partners.map(p => ({
            id: p.id,
            applicationId: p.application_id,
            stage: p.stage as any,
            outreachLogs: p.outreach_logs.map((l: any) => ({
                id: l.id,
                date: l.date,
                medium: l.medium,
                count: l.count,
                replies: l.replies,
                interested: l.interested,
                notes: l.notes
            })),
            earnings: {
                total: p.earnings_total || 0,
                paid: p.earnings_paid || 0,
                pending: p.earnings_pending || 0
            },
            bankDetails: p.bank_details || {}
        }));
    },

    // --- Partner ---
    getPartnerData: async (partnerId: string): Promise<PartnerData | null> => {
        // Fetch Partner
        const { data: partner, error } = await supabase
            .from('partners')
            .select('*')
            .eq('id', partnerId)
            .single();

        if (error || !partner) return null;

        // Fetch Logs
        const { data: logs } = await supabase
            .from('outreach_logs')
            .select('*')
            .eq('partner_id', partnerId)
            .order('date', { ascending: false });

        return {
            id: partner.id,
            applicationId: partner.application_id,
            stage: partner.stage as any,
            outreachLogs: logs || [],
            earnings: {
                total: partner.earnings_total || 0,
                paid: partner.earnings_paid || 0,
                pending: partner.earnings_pending || 0
            },
            bankDetails: partner.bank_details || {}
        };
    },

    logOutreach: async (partnerId: string, log: any) => {
        const { data, error } = await supabase
            .from('outreach_logs')
            .insert([{
                partner_id: partnerId,
                medium: log.medium,
                count: log.count,
                replies: log.replies,
                interested: log.interested,
                notes: log.notes,
                date: log.date
            }])
            .select()
            .single();

        return data;
    }
};
