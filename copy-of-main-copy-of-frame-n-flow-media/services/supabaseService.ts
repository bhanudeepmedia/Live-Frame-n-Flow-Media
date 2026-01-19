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
        let partnerRole = profile?.role || 'partner'; // Default to partner

        if (true) { // Always check for partner record to support auto-creation
            const { data: partner } = await supabase
                .from('partners')
                .select('id')
                .eq('user_id', data.user.id)
                .single();

            if (partner) {
                partnerId = partner.id;
            } else {
                // AUTO-HEAL: If no partner record, check for APPROVED Application
                const { data: apps } = await supabase
                    .from('applications')
                    .select('id')
                    .eq('email', email)
                    .eq('status', 'approved')
                    .limit(1);

                const app = apps?.[0]; // robust handle duplicates

                if (app) {
                    console.log("Found approved app but no partner record. creating...");
                    const { data: newPartner, error: createError } = await supabase
                        .from('partners')
                        .insert({
                            user_id: data.user.id,
                            application_id: app.id,
                            stage: 'Starter',
                            earnings_total: 0
                        })
                        .select()
                        .single();

                    if (newPartner) partnerId = newPartner.id;
                }
            }
        }

        const user: User = {
            id: data.user.id,
            username: email, // Using email as username
            name: profile?.full_name || email.split('@')[0],
            role: partnerRole as any,
            partnerId,
            email: email
        };

        return { user };
    },

    // Signup for Approved Partners
    signup: async (email: string, password: string, fullName: string) => {
        // 1. Verify Application exists and is Approved
        const { data: apps, error: appError } = await supabase
            .from('applications')
            .select('*')
            .eq('email', email)
            .eq('status', 'approved')
            .limit(1);

        const app = apps?.[0];

        if (appError || !app) {
            return { error: 'No approved application found for this email. Please apply first or wait for approval.' };
        }

        // 2. Create User in Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        });

        if (authError) return { error: authError.message };
        if (!authData.user) return { error: 'Signup failed unexpectedly.' };

        // 3. Create Partner Record explicitly linking User -> Application
        // (Profile is created by trigger, but Partner entry needs link)
        const { error: partnerError } = await supabase
            .from('partners')
            .insert({
                user_id: authData.user.id,
                application_id: app.id,
                stage: 'Starter',
                earnings_total: 0
            });

        if (partnerError) {
            console.error('Partner creation error:', partnerError);
            // We don't fail full signup if this fails, but it's bad. 
            // Ideally we'd use a transaction but can't easily here.
        }

        return { user: authData.user };
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
        // 1. Check for duplicates
        const { data: existing } = await supabase
            .from('applications')
            .select('id')
            .eq('email', data.email)
            .maybeSingle();

        if (existing) {
            throw new Error("Application with this email already submitted. Please wait for response.");
        }

        // 2. Submit
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
            appliedAt: result.created_at,
            linkedin: result.linkedin_url,
            social: result.social_url
        }));
    },

    reviewApplication: async (appId: string, status: 'approved' | 'rejected' | 'pending') => {
        const { error } = await supabase
            .from('applications')
            .update({ status })
            .eq('id', appId);

        return { success: !error };
    },

    deleteApplication: async (appId: string) => {
        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', appId);
        return { success: !error };
    },

    getAllPartners: async (): Promise<PartnerData[]> => {
        const { data: partners, error } = await supabase
            .from('partners')
            .select(`
                *,
                outreach_logs (*),
                earnings_history (*)
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
            earningsHistory: p.earnings_history ? p.earnings_history.map((e: any) => ({
                id: e.id,
                amount: e.amount,
                date: e.date,
                leadName: e.lead_name
            })) : [],
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

        // Fetch Earnings History
        const { data: earningsLogs } = await supabase
            .from('earnings_history')
            .select('*')
            .eq('partner_id', partnerId)
            .order('date', { ascending: false });

        return {
            id: partner.id,
            applicationId: partner.application_id,
            stage: partner.stage as any,
            outreachLogs: logs || [],
            earningsHistory: earningsLogs ? earningsLogs.map((e: any) => ({
                id: e.id,
                amount: e.amount,
                date: e.date,
                leadName: e.lead_name
            })) : [],
            earnings: {
                total: partner.earnings_total || 0,
                paid: partner.earnings_paid || 0,
                pending: partner.earnings_pending || 0
            },
            bankDetails: partner.bank_details || {}
        };
    },

    addEarning: async (partnerId: string, amount: number, date: string, leadName: string) => {
        // 1. Insert History
        const { error: logError } = await supabase
            .from('earnings_history')
            .insert({
                partner_id: partnerId,
                amount,
                date,
                lead_name: leadName
            });

        if (logError) return { success: false, error: logError.message };

        // 2. Increment Partner Total Earnings AND Pending Earnings
        // Use RPC or fetch-update. For now fetch-update.
        const { data: partner } = await supabase
            .from('partners')
            .select('earnings_total, earnings_pending')
            .eq('id', partnerId)
            .single();

        if (partner) {
            const newTotal = (partner.earnings_total || 0) + Number(amount);
            const newPending = (partner.earnings_pending || 0) + Number(amount);

            await supabase
                .from('partners')
                .update({
                    earnings_total: newTotal,
                    earnings_pending: newPending
                })
                .eq('id', partnerId);
        }

        return { success: true };
    },

    updateProfile: async (userId: string, updates: { avatar_url?: string }) => {
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);
        return { success: !error, error };
    },

    // --- Partner Leads ---
    getLeads: async (partnerId: string) => {
        const { data, error } = await supabase
            .from('partner_leads')
            .select('*')
            .eq('partner_id', partnerId)
            .order('created_at', { ascending: false });
        return data || [];
    },

    addLead: async (lead: any) => {
        const { data, error } = await supabase.from('partner_leads').insert([lead]).select().single();
        return { data, error };
    },

    updateLead: async (leadId: string, updates: any) => {
        const { error } = await supabase.from('partner_leads').update(updates).eq('id', leadId);
        return { error };
    },

    deleteLead: async (leadId: string) => {
        const { error } = await supabase.from('partner_leads').delete().eq('id', leadId);
        return { error };
    },

    // --- Partner Profile & Bank ---
    updatePartnerDetails: async (partnerId: string, updates: any) => {
        const { error } = await supabase.from('partners').update(updates).eq('id', partnerId);
        return { error };
    },

    updateBankDetails: async (partnerId: string, details: any) => {
        const { error } = await supabase
            .from('partners')
            .update({ bank_details: details })
            .eq('id', partnerId);
        return { success: !error, error };
    },

    deleteLog: async (logId: string) => {
        const { error } = await supabase
            .from('outreach_logs')
            .delete()
            .eq('id', logId);
        return { success: !error, error };
    },

    updateLog: async (logId: string, updates: any) => {
        const { error } = await supabase
            .from('outreach_logs')
            .update(updates)
            .eq('id', logId);
        return { success: !error, error };
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
                date: log.date,
                location: log.location,
                niche: log.niche,
                appointments_booked: log.appointments_booked || 0
            }])
            .select()
            .single();

        return data;
    },
    // --- ADMIN EXTENSIONS ---

    getAllLeads: async () => {
        // Fetch all leads
        const { data: leads, error } = await supabase
            .from('partner_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return [];
        return leads;
    },

    updateLeadAdmin: async (leadId: string, updates: any) => {
        // updates: { status, payout_status, admin_notes, is_duplicate, deal_value }
        const { error } = await supabase.from('partner_leads').update(updates).eq('id', leadId);
        return { error };
    },

    // Settings
    getAdminSettings: async () => {
        const { data } = await supabase.from('admin_settings').select('*').single();
        return data || { commission_percentage: 20, accepted_platforms: ['Instagram', 'LinkedIn'], terms_content: '' };
    },

    updateAdminSettings: async (settings: any) => {
        // Upsert based on there being only one row effectively
        const { data: existing } = await supabase.from('admin_settings').select('id').single();
        if (existing) {
            const { error } = await supabase.from('admin_settings').update(settings).eq('id', existing.id);
            return { error };
        } else {
            const { error } = await supabase.from('admin_settings').insert([settings]);
            return { error };
        }
    },

    // Broadcasts
    sendBroadcast: async (title: string, message: string) => {
        const { error } = await supabase.from('admin_notifications').insert([{ title, message }]);
        return { error };
    },

    getBroadcasts: async () => {
        const { data } = await supabase
            .from('admin_notifications')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        return data || [];
    },

    deleteBroadcast: async (id: string) => {
        // Soft delete
        const { error } = await supabase
            .from('admin_notifications')
            .update({ is_active: false })
            .eq('id', id);
        return { error };
    }
};
