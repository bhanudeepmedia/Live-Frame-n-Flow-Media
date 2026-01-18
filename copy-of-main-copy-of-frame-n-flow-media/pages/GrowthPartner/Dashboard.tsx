import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, PartnerData, OutreachLog } from '../../services/mockBackend';
import { SupabaseBackend } from '../../services/supabaseService';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    DollarSign,
    BookOpen,
    Settings,
    LogOut,
    Plus,
    Save,
    Trash2,
    Edit2,
    Search,
    CheckCircle,
    XCircle,
    Calendar,
    MapPin,
    Briefcase,
    Flame,
    CreditCard,
    Phone,
    Mail,
    User as UserIcon,
    Menu,
    X
} from 'lucide-react';

// --- SUB-COMPONENTS ---

// 1. OVERVIEW
const Overview = ({ partnerData, streak, user }: any) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-display font-bold">Welcome, {user?.name.split(' ')[0]}</h2>
                <p className="text-muted">Here is your growth snapshot.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface border border-white/5 p-5 rounded-xl">
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Total Outreach</div>
                    <div className="text-3xl font-bold">{partnerData.outreachLogs.reduce((acc: any, l: any) => acc + l.count, 0)}</div>
                </div>
                <div className="bg-surface border border-white/5 p-5 rounded-xl">
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Active Streak</div>
                    <div className="text-3xl font-bold text-orange-500 flex items-center gap-2">
                        <Flame fill="currentColor" size={24} /> {streak}
                    </div>
                </div>
                <div className="bg-surface border border-white/5 p-5 rounded-xl">
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Leads Generated</div>
                    <div className="text-3xl font-bold text-green-400">{partnerData.outreachLogs.reduce((acc: any, l: any) => acc + l.interested, 0)}</div>
                </div>
                <div className="bg-surface border border-white/5 p-5 rounded-xl">
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Pending Comm.</div>
                    <div className="text-3xl font-bold text-yellow-400">₹{partnerData.earnings.pending}</div>
                </div>
            </div>

            {/* Performance Graph (Simplified Visual) */}
            <div className="bg-surface border border-white/5 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Recent Activity</h3>
                <div className="h-40 flex items-end gap-2">
                    {partnerData.outreachLogs.slice(0, 14).reverse().map((log: any, i: number) => {
                        const heightPer = Math.min(100, (log.count / 50) * 100); // assume 50 is max daily goal
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                <div
                                    className="w-full bg-accent/50 rounded-t-sm transition-all group-hover:bg-accent relative"
                                    style={{ height: `${heightPer}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap border border-white/10 z-10">
                                        {log.count} sent
                                    </div>
                                </div>
                                <div className="text-[10px] text-muted rotate-0 truncate w-full text-center">{new Date(log.date).getDate()}</div>
                            </div>
                        );
                    })}
                    {partnerData.outreachLogs.length === 0 && <div className="w-full text-center text-muted self-center">No activity to show yet.</div>}
                </div>
            </div>
        </div>
    );
};

// 2. LEADS MANAGEMENT
const LeadsManager = ({ user }: any) => {
    const [leads, setLeads] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState({
        business_name: '', contact_person: '', source_platform: 'Instagram', status: 'Contacted', notes: '', appointment_date: ''
    });

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        if (user?.partnerId) {
            const data = await SupabaseBackend.getLeads(user.partnerId);
            setLeads(data);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.partnerId) return;

        await SupabaseBackend.addLead({
            ...form,
            partner_id: user.partnerId,
            appointment_date: form.appointment_date ? new Date(form.appointment_date).toISOString() : null
        });
        setIsAdding(false);
        setForm({ business_name: '', contact_person: '', source_platform: 'Instagram', status: 'Contacted', notes: '', appointment_date: '' });
        loadLeads();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this lead?')) return;
        await SupabaseBackend.deleteLead(id);
        loadLeads();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-display font-bold">My Leads</h2>
                    <p className="text-muted">Track every potential deal.</p>
                </div>
                <button onClick={() => setIsAdding(true)} className="bg-accent text-background px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white">
                    <Plus size={18} /> Add Lead
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSave} className="bg-surface border border-white/10 p-6 rounded-xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required placeholder="Business Name" value={form.business_name} onChange={e => setForm({ ...form, business_name: e.target.value })} className="bg-background border border-white/10 p-3 rounded-lg w-full" />
                        <input placeholder="Contact Person" value={form.contact_person} onChange={e => setForm({ ...form, contact_person: e.target.value })} className="bg-background border border-white/10 p-3 rounded-lg w-full" />
                        <select value={form.source_platform} onChange={e => setForm({ ...form, source_platform: e.target.value })} className="bg-background border border-white/10 p-3 rounded-lg w-full">
                            <option>Instagram</option><option>LinkedIn</option><option>Email</option><option>WhatsApp</option><option>Other</option>
                        </select>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="bg-background border border-white/10 p-3 rounded-lg w-full">
                            <option>Contacted</option><option>Booked Call</option><option>Proposal Sent</option><option>Converted</option><option>Lost</option>
                        </select>
                        <textarea placeholder="Notes..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="bg-background border border-white/10 p-3 rounded-lg w-full md:col-span-2" />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAdding(false)} className="text-muted">Cancel</button>
                        <button type="submit" className="bg-accent text-background px-6 py-2 rounded-lg font-bold">Save Lead</button>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {leads.length === 0 ? <div className="text-center text-muted py-10">No leads added yet.</div> : leads.map(lead => (
                    <div key={lead.id} className="bg-surface border border-white/5 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="font-bold text-lg">{lead.business_name}</div>
                            <div className="text-sm text-muted">{lead.contact_person} • {lead.source_platform}</div>
                            {lead.notes && <div className="text-xs text-muted mt-1 italic">"{lead.notes}"</div>}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${lead.status.toLowerCase().includes('converted') ? 'bg-green-500/20 text-green-500' :
                                    lead.status.toLowerCase().includes('lost') ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                                }`}>
                                {lead.status}
                            </span>
                            <button onClick={() => handleDelete(lead.id)} className="text-muted hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. RESOURCES 
const Resources = () => (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-display font-bold">Resources</h2>
        <div className="grid gap-4">
            {['Outreach Scripts', 'Qualification Checklist', 'Call Etiquette Guide', 'FAQ'].map(item => (
                <div key={item} className="bg-surface border border-white/10 p-6 rounded-xl flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
                    <span className="font-bold text-lg">{item}</span>
                    <BookOpen className="text-muted group-hover:text-accent transition-colors" size={20} />
                </div>
            ))}
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl">
            <h3 className="font-bold text-blue-400 mb-2">Internal Announcements</h3>
            <p className="text-sm text-muted">Welcome to the new portal! Please update your profile details and banking information to ensure smooth payouts.</p>
        </div>
    </div>
);

// 4. PROFILE & SETTINGS
const ProfileSettings = ({ user, partnerData, refresh }: any) => {
    const [form, setForm] = useState({
        phone: partnerData?.phone || '',
        location: partnerData?.location || '', // Assuming we map city -> location for display
        timezone: partnerData?.timezone || 'IST',
        upiId: partnerData?.bankDetails?.upiId || '',
        bankName: partnerData?.bankDetails?.bankName || '',
        accountNumber: partnerData?.bankDetails?.accountNumber || '',
        ifsc: partnerData?.bankDetails?.ifsc || ''
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        // Update general partner details
        await SupabaseBackend.updatePartnerDetails(user.partnerId, {
            phone: form.phone,
            timezone: form.timezone
        });
        // Update bank
        await SupabaseBackend.updateBankDetails(user.partnerId, {
            upiId: form.upiId, bankName: form.bankName, accountNumber: form.accountNumber, ifsc: form.ifsc
        });
        alert("Settings Saved!");
        refresh();
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            <h2 className="text-3xl font-display font-bold">Profile & Settings</h2>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-surface border border-white/10 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><UserIcon size={18} /> Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-muted">Full Name</label>
                            <input disabled value={user.name} className="w-full bg-white/5 border border-white/10 rounded p-2 text-muted cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="text-xs text-muted">Email</label>
                            <input disabled value={user.email} className="w-full bg-white/5 border border-white/10 rounded p-2 text-muted cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="text-xs text-muted">Phone Number</label>
                            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2" />
                        </div>
                        <div>
                            <label className="text-xs text-muted">Timezone</label>
                            <select value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2 text-white">
                                <option>IST (India)</option><option>EST (US)</option><option>PST (US)</option><option>GMT (UK)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-surface border border-white/10 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><CreditCard size={18} /> Banking Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-muted">UPI ID</label>
                            <input value={form.upiId} onChange={e => setForm({ ...form, upiId: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2" placeholder="user@upi" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted">Bank Name</label>
                                <input value={form.bankName} onChange={e => setForm({ ...form, bankName: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2" />
                            </div>
                            <div>
                                <label className="text-xs text-muted">IFSC / Code</label>
                                <input value={form.ifsc} onChange={e => setForm({ ...form, ifsc: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted">Account Number</label>
                            <input value={form.accountNumber} onChange={e => setForm({ ...form, accountNumber: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-accent text-background px-8 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- MAIN LAYOUT COMPONENT ---

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'overview' | 'leads' | 'log' | 'earnings' | 'resources' | 'profile'>('overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Re-use Logic from before
    const [logForm, setLogForm] = useState({ medium: 'Instagram', count: 0, replies: 0, interested: 0, appointments_booked: 0, notes: '', date: new Date().toISOString().split('T')[0], location: '', niche: '' });

    useEffect(() => {
        const init = async () => {
            const currentUser = await SupabaseBackend.getCurrentUser();
            if (!currentUser || currentUser.role !== 'partner') {
                navigate('/growth-partner/login');
                return;
            }
            setUser(currentUser);
            if (currentUser.partnerId) loadPartnerData(currentUser.partnerId);
        };
        init();
    }, [navigate]);

    const loadPartnerData = async (id: string) => {
        const data = await SupabaseBackend.getPartnerData(id);
        setPartnerData(data);
        setLoading(false);
    };

    const handleLogout = async () => {
        await SupabaseBackend.logout();
        navigate('/growth-partner/login');
    };

    // Calculate Streak
    const calculateStreak = () => {
        if (!partnerData?.outreachLogs || partnerData.outreachLogs.length === 0) return 0;
        const sortedLogs = [...partnerData.outreachLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const uniqueDates = Array.from(new Set(sortedLogs.map(l => new Date(l.date).toLocaleDateString())));
        let streak = 0;
        const today = new Date().toLocaleDateString();
        const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
        if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
            streak = 1;
            let checksDate = new Date(uniqueDates[0]);
            for (let i = 1; i < uniqueDates.length; i++) {
                const prevDate = new Date(checksDate);
                prevDate.setDate(prevDate.getDate() - 1);
                if (uniqueDates[i] === prevDate.toLocaleDateString()) { streak++; checksDate = prevDate; } else break;
            }
        }
        return streak;
    };

    const handleSubmitLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.partnerId) return;
        await SupabaseBackend.logOutreach(user.partnerId, { ...logForm, date: new Date(logForm.date).toISOString() });
        loadPartnerData(user.partnerId);
        setView('overview'); // Go back to overview after log
    };

    if (loading || !partnerData) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Portal...</div>;

    const streak = calculateStreak();

    // Navigation Items
    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'log', label: 'Daily Log', icon: ClipboardList },
        { id: 'leads', label: 'My Leads', icon: Users },
        { id: 'earnings', label: 'Earnings', icon: DollarSign },
        { id: 'resources', label: 'Resources', icon: BookOpen },
        { id: 'profile', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-white flex">

            {/* MOBILE HEADER */}
            <div className="fixed top-0 w-full md:hidden bg-background/90 backdrop-blur z-50 border-b border-white/5 flex items-center justify-between p-4">
                <div className="font-bold font-display">Frame n Flow</div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu /></button>
            </div>

            {/* SIDEBAR */}
            <aside className={`fixed md:relative inset-y-0 left-0 w-64 bg-surface border-r border-white/5 transform transition-transform z-40 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-10 hidden md:block">
                        <div className="font-bold text-xl font-display tracking-tight">Frame n Flow <span className="text-accent">Partner</span></div>
                        <div className="text-xs text-muted mt-1 uppercase tracking-widest pl-1">Portal v2.0</div>
                    </div>

                    <nav className="space-y-2 flex-1 pt-12 md:pt-0">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => { setView(item.id as any); setMobileMenuOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === item.id ? 'bg-accent/10 text-accent font-bold' : 'text-muted hover:bg-white/5 hover:text-white'}`}
                            >
                                <item.icon size={20} /> {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center font-bold">
                                {user?.name.charAt(0)}
                            </div>
                            <div className="text-sm">
                                <div className="font-bold">{user?.name.split(' ')[0]}</div>
                                <div className="text-xs text-muted">{partnerData.gpId || `GP-${user?.id.slice(0, 4)}`}</div>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-2 py-2 text-sm transition-colors">
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 min-h-screen pt-20 md:pt-0 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-6 md:p-12">
                    {/* VIEW ROUTING */}
                    {view === 'overview' && <Overview partnerData={partnerData} streak={streak} user={user} />}
                    {view === 'leads' && <LeadsManager user={user} />}
                    {view === 'resources' && <Resources />}
                    {view === 'profile' && <ProfileSettings user={user} partnerData={partnerData} refresh={() => loadPartnerData(user?.partnerId!)} />}

                    {view === 'earnings' && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-3xl font-display font-bold">Earnings & Commissions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-surface p-6 rounded-xl border border-white/5">
                                    <div className="text-sm text-muted mb-1">Total Lifetime Earnings</div>
                                    <div className="text-3xl font-bold">₹{partnerData.earnings.total}</div>
                                </div>
                                <div className="bg-surface p-6 rounded-xl border border-white/5">
                                    <div className="text-sm text-muted mb-1">Approved & Paid</div>
                                    <div className="text-3xl font-bold text-green-400">₹{partnerData.earnings.paid}</div>
                                </div>
                                <div className="bg-surface p-6 rounded-xl border border-white/5">
                                    <div className="text-sm text-muted mb-1">Pending Approval</div>
                                    <div className="text-3xl font-bold text-yellow-400">₹{partnerData.earnings.pending}</div>
                                </div>
                            </div>
                            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                                ℹ️ Commissions are reviewed weekly. "Pending" amounts are estimates based on booked calls and may change upon final deal closure.
                            </div>
                        </div>
                    )}

                    {view === 'log' && (
                        <div className="max-w-2xl animate-fade-in space-y-6">
                            <h2 className="text-3xl font-display font-bold">Daily Activity Log</h2>
                            <div className="bg-surface border border-white/10 rounded-2xl p-8">
                                <form onSubmit={handleSubmitLog} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-muted uppercase">Date</label>
                                            <input type="date" value={logForm.date} onChange={e => setLogForm({ ...logForm, date: e.target.value })} className="w-full bg-background border border-white/10 rounded-lg p-3 text-white scheme-dark mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-muted uppercase">Platform</label>
                                            <select value={logForm.medium} onChange={e => setLogForm({ ...logForm, medium: e.target.value })} className="w-full bg-background border border-white/10 rounded-lg p-3 mt-1">
                                                {['Instagram', 'LinkedIn', 'WhatsApp', 'Email', 'Calls'].map(m => <option key={m}>{m}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-muted uppercase">Sent</label>
                                            <input type="number" min="0" value={logForm.count} onChange={e => setLogForm({ ...logForm, count: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-lg p-3 mt-1 text-center font-mono" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-muted uppercase">Replies</label>
                                            <input type="number" min="0" value={logForm.replies} onChange={e => setLogForm({ ...logForm, replies: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-lg p-3 mt-1 text-center font-mono" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-green-400 uppercase">Leads</label>
                                            <input type="number" min="0" value={logForm.interested} onChange={e => setLogForm({ ...logForm, interested: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-green-500/20 rounded-lg p-3 mt-1 text-center font-mono text-green-400 font-bold" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-blue-400 uppercase">Appointments Booked</label>
                                        <input type="number" min="0" value={logForm.appointments_booked} onChange={e => setLogForm({ ...logForm, appointments_booked: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-blue-500/20 rounded-lg p-3 mt-1 text-center font-mono text-blue-400 font-bold" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-muted uppercase">Target Location & Niche</label>
                                        <div className="grid grid-cols-2 gap-4 mt-1">
                                            <input placeholder="City, Country" value={logForm.location} onChange={e => setLogForm({ ...logForm, location: e.target.value })} className="w-full bg-background border border-white/10 rounded-lg p-3 text-sm" />
                                            <input placeholder="Niche (e.g. Realtors)" value={logForm.niche} onChange={e => setLogForm({ ...logForm, niche: e.target.value })} className="w-full bg-background border border-white/10 rounded-lg p-3 text-sm" />
                                        </div>
                                    </div>
                                    <textarea placeholder="Notes / Observations..." value={logForm.notes} onChange={e => setLogForm({ ...logForm, notes: e.target.value })} className="w-full bg-background border border-white/10 rounded-lg p-3 h-24" />

                                    <button type="submit" className="w-full bg-accent text-background font-bold py-4 rounded-xl hover:bg-white transition-colors">Submit Daily Log</button>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
