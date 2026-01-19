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
    X,
    Send,
    MessageCircle,
    PieChart,
    TrendingUp,
    Target,
    Bell // Added
} from 'lucide-react';

// --- SUB-COMPONENTS ---

// 1. OVERVIEW (INFOGRAPHICS ENHANCED)
const Overview = ({ partnerData, streak, user }: any) => {
    // Determine Symbol
    const symbol = partnerData.primary_currency === 'USD' ? '$' : '₹';
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotifs = async () => {
            const notifs = await SupabaseBackend.getBroadcasts();
            const cleared = JSON.parse(localStorage.getItem('cleared_notifications') || '[]');
            setNotifications(notifs.filter((n: any) => !cleared.includes(n.id)));
        };
        fetchNotifs();
    }, []);

    const clearNotification = (id: string) => {
        const cleared = JSON.parse(localStorage.getItem('cleared_notifications') || '[]');
        localStorage.setItem('cleared_notifications', JSON.stringify([...cleared, id]));
        setNotifications(notifications.filter(n => n.id !== id));
    };

    // Calculate Platform Split for Pie Chart
    const logs = partnerData.outreachLogs || [];
    const leads = logs.map((l: any) => l.interested).reduce((a: any, b: any) => a + b, 0);

    // ... (Stats Logic Unchanged) ...
    const instaStats = logs.filter((l: any) => l.medium === 'Instagram');
    const linkedInStats = logs.filter((l: any) => l.medium === 'LinkedIn');

    const instaLeads = instaStats.reduce((acc: any, l: any) => acc + l.interested, 0);
    const linkedInLeads = linkedInStats.reduce((acc: any, l: any) => acc + l.interested, 0);

    // Safety for pie chart
    const totalForPie = Math.max(1, leads);
    const instaPer = (instaLeads / totalForPie) * 100;
    const linkedInPer = (linkedInLeads / totalForPie) * 100;

    // Monthly Earnings Goal
    const monthlyGoal = 50000;
    const currentEarnings = (partnerData.earnings.paid || 0) + (partnerData.earnings.pending || 0);
    const goalPer = Math.min(100, (currentEarnings / monthlyGoal) * 100);

    return (
        <div className="space-y-8 animate-fade-in relative">
            {/* Header with Bell */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold">Growth Partner Program</h2>
                    <p className="text-muted">Welcome back, {user?.name.split(' ')[0]}. You are on a <span className="text-orange-500 font-bold flex inline-flex items-center gap-1"><Flame size={16} fill="currentColor" /> {streak} day streak!</span></p>
                </div>
                <div className="flex items-center gap-3 relative">
                    {/* Notification Bell */}
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-colors relative"
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-surface"></div>
                        )}
                    </button>

                    {/* Notification Popup */}
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-12 right-0 w-80 bg-[#0f0f12] border border-white/10 rounded-xl shadow-xl z-50 p-4 max-h-64 overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold text-sm">Notifications</h4>
                                    <button onClick={() => setShowNotifications(false)}><X size={14} className="text-muted hover:text-white" /></button>
                                </div>
                                <div className="space-y-2">
                                    {notifications.length === 0 ? (
                                        <div className="text-center text-xs text-muted py-4">No new notifications</div>
                                    ) : (
                                        notifications.map((n: any) => (
                                            <div key={n.id} className="bg-white/5 p-3 rounded-lg text-xs border-l-2 border-accent relative group">
                                                <button
                                                    onClick={() => clearNotification(n.id)}
                                                    className="absolute top-2 right-2 text-muted hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                                <div className="font-bold mb-1 pr-4">{n.title}</div>
                                                <div className="text-muted mb-2">{n.message}</div>
                                                <div className="text-[10px] text-muted opacity-50">{new Date(n.created_at).toLocaleDateString()}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-2 bg-surface border border-white/10 px-4 py-2 rounded-full">
                        <div className="text-xs font-bold text-muted uppercase tracking-wider">Current Tier</div>
                        <div className="text-accent font-bold">{partnerData.stage}</div>
                    </div>
                </div>
            </div>

            {/* TOP ROW: KEY METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Send size={80} /></div>
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Total Outreach</div>
                    <div className="text-3xl font-bold">{logs.reduce((acc: any, l: any) => acc + l.count, 0)}</div>
                    <div className="text-xs text-green-400 mt-1 flex items-center gap-1"><TrendingUp size={12} /> Top performer</div>
                </div>
                <div className="bg-surface border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={80} /></div>
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Total Leads</div>
                    <div className="text-3xl font-bold text-white">{leads}</div>
                    <div className="text-xs text-muted mt-1">Avg {(leads / Math.max(1, logs.length)).toFixed(1)} per day</div>
                </div>
                <div className="bg-surface border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Calendar size={80} /></div>
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Booked Calls</div>
                    <div className="text-3xl font-bold text-blue-400">{logs.reduce((acc: any, l: any) => acc + (l.appointments_booked || 0), 0)}</div>
                </div>
                <div className="bg-surface border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                    {/* Changed background icon to CreditCard to avoid confusion with currency symbol */}
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CreditCard size={80} /></div>
                    <div className="text-muted text-xs uppercase tracking-wider mb-2">Pipeline Value</div>
                    <div className="text-3xl font-bold text-yellow-400">{symbol}{currentEarnings}</div>
                </div>
            </div>

            {/* MIDDLE ROW: INFOGRAPHICS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. GOAL RING */}
                <div className="bg-surface border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center relative">
                    <h3 className="w-full font-bold text-left mb-4 flex items-center gap-2 text-sm text-muted uppercase tracking-wider">
                        <Target size={16} /> Monthly Goal
                    </h3>
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="96" cy="96" r="88" className="stroke-white/5" strokeWidth="12" fill="none" />
                            <circle cx="96" cy="96" r="88" className="stroke-accent transition-all duration-1000 ease-out" strokeWidth="12" fill="none" strokeDasharray={553} strokeDashoffset={553 - (553 * goalPer) / 100} strokeLinecap="round" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-bold font-display">{Math.round(goalPer)}%</span>
                            <span className="text-xs text-muted">of {symbol}50k Goal</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="text-sm font-bold text-white">{symbol}{currentEarnings.toLocaleString()} / {symbol}50,000</div>
                        <div className="text-xs text-muted">Keep pushing! You're doing great.</div>
                    </div>
                </div>

                {/* 2. LEAD PIE (LAYOUT FIXED) */}
                <div className="bg-surface border border-white/5 p-6 rounded-3xl flex flex-col justify-between">
                    <h3 className="font-bold mb-6 flex items-center gap-2 text-sm text-muted uppercase tracking-wider">
                        <PieChart size={16} /> Lead Sources
                    </h3>
                    <div className="flex flex-col xl:flex-row items-center gap-8 h-full justify-center">
                        <div className="w-32 h-32 rounded-full shrink-0 relative" style={{ background: `conic-gradient(#A855F7 0% ${instaPer}%, #3B82F6 ${instaPer}% ${instaPer + linkedInPer}%, #22c55e ${instaPer + linkedInPer}% 100%)` }}>
                            <div className="absolute inset-4 bg-surface rounded-full"></div>
                        </div>
                        <div className="space-y-3 text-sm flex-1 w-full">
                            <div className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Instagram</div>
                                <div className="font-bold">{Math.round(instaPer)}%</div>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> LinkedIn</div>
                                <div className="font-bold">{Math.round(linkedInPer)}%</div>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Other</div>
                                <div className="font-bold">{Math.round(100 - (instaPer + linkedInPer))}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TREND GRAPH */}
                <div className="bg-surface border border-white/5 p-6 rounded-3xl flex flex-col">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-sm text-muted uppercase tracking-wider">
                        <TrendingUp size={16} /> 14-Day Trend
                    </h3>
                    <div className="flex-1 flex items-end gap-2 h-full min-h-[150px]">
                        {logs.slice(0, 7).reverse().map((log: any, i: number) => {
                            const h = Math.min(100, (log.count / 50) * 100);
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                                    <div className="w-full bg-white/10 rounded-t-lg transition-all group-hover:bg-accent relative" style={{ height: `${h}%` }}></div>
                                    <div className="text-[10px] text-muted">{new Date(log.date).getDate()}</div>
                                </div>
                            );
                        })}
                        {logs.length === 0 && <div className="w-full h-full flex items-center justify-center text-muted text-xs">Not enough data</div>}
                    </div>
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
        location: partnerData?.location || '',
        timezone: partnerData?.timezone || 'IST',
        primary_currency: partnerData?.primary_currency || 'INR',
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
            timezone: form.timezone,
            primary_currency: form.primary_currency
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
                        <div>
                            <label className="text-xs text-muted">Primary Currency</label>
                            <select value={form.primary_currency} onChange={e => setForm({ ...form, primary_currency: e.target.value })} className="w-full bg-background border border-white/10 rounded p-2 text-white">
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
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

    // Currency Symbol Helper
    const symbol = partnerData?.primary_currency === 'USD' ? '$' : '₹';

    if (loading || !partnerData) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
                <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 animate-pulse">
                    Frame n Flow Media
                </div>
                <div className="text-accent text-sm font-mono tracking-widest uppercase animate-pulse">
                    Loading GPP...
                </div>
            </div>
        )
    }

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
            <aside className={`fixed md:relative inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/5 transform transition-transform z-40 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-gradient-to-b from-black via-black to-accent/5`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-10 hidden md:block">
                        <div className="font-bold text-xl font-display tracking-tight">Frame n Flow <span className="text-accent">Media</span></div>
                        <div className="text-xs text-muted mt-1 uppercase tracking-widest pl-1">GPP</div>
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
                                    <div className="text-3xl font-bold">{symbol}{partnerData.earnings.total}</div>
                                </div>
                                <div className="bg-surface p-6 rounded-xl border border-white/5">
                                    <div className="text-sm text-muted mb-1">Approved & Paid</div>
                                    <div className="text-3xl font-bold text-green-400">{symbol}{partnerData.earnings.paid}</div>
                                </div>
                                <div className="bg-surface p-6 rounded-xl border border-white/5">
                                    <div className="text-sm text-muted mb-1">Pending Approval</div>
                                    <div className="text-3xl font-bold text-yellow-400">{symbol}{partnerData.earnings.pending}</div>
                                </div>
                            </div>
                            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                                ℹ️ Commissions are reviewed weekly. "Pending" amounts are estimates based on booked calls and may change upon final deal closure.
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4">Payout History</h3>
                                <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
                                    {partnerData.earningsHistory && partnerData.earningsHistory.length > 0 ? (
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-white/5 text-muted uppercase text-xs">
                                                <tr>
                                                    <th className="p-4">Date</th>
                                                    <th className="p-4">Client / Deal</th>
                                                    <th className="p-4">Val</th>
                                                    <th className="p-4 text-center">%</th>
                                                    <th className="p-4 text-right">Commission</th>
                                                    <th className="p-4 text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {partnerData.earningsHistory.map((e: any) => (
                                                    <tr key={e.id} className="hover:bg-white/5 transition-colors">
                                                        <td className="p-4 text-muted text-xs">{new Date(e.date).toLocaleDateString()}</td>
                                                        <td className="p-4">
                                                            <div className="font-bold">{e.clientName}</div>
                                                            <div className="text-[10px] text-muted uppercase">{e.serviceType || 'Service'}</div>
                                                        </td>
                                                        <td className="p-4 text-xs font-mono opacity-70">₹{Number(e.dealValue).toLocaleString()}</td>
                                                        <td className="p-4 text-xs text-center">{e.commissionPerc || 20}%</td>
                                                        <td className="p-4 text-right font-mono font-bold text-green-400">
                                                            {symbol}{Number(e.amount).toLocaleString()}
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${e.status === 'paid' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                                                    e.status === 'approved' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                                                                        e.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                                            'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                                                }`}>
                                                                {e.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="p-8 text-center text-muted">No payout history available yet.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'log' && (
                        <div className="max-w-2xl animate-fade-in space-y-6">
                            <h2 className="text-3xl font-display font-bold">Daily Activity Log</h2>
                            <div className="bg-surface border border-white/10 rounded-2xl p-8">
                                <form onSubmit={handleSubmitLog} className="space-y-6">
                                    {/* FIXED: grid-cols-1 on mobile for Platform/Date */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            <input type="number" min="0" value={logForm.count === 0 ? '' : logForm.count} onChange={e => setLogForm({ ...logForm, count: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-lg p-3 mt-1 text-center font-mono" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-muted uppercase">Replies</label>
                                            <input type="number" min="0" value={logForm.replies === 0 ? '' : logForm.replies} onChange={e => setLogForm({ ...logForm, replies: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-white/10 rounded-lg p-3 mt-1 text-center font-mono" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-green-400 uppercase">Leads</label>
                                            <input type="number" min="0" value={logForm.interested === 0 ? '' : logForm.interested} onChange={e => setLogForm({ ...logForm, interested: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-green-500/20 rounded-lg p-3 mt-1 text-center font-mono text-green-400 font-bold" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-blue-400 uppercase">Appointments Booked</label>
                                        <input type="number" min="0" value={logForm.appointments_booked === 0 ? '' : logForm.appointments_booked} onChange={e => setLogForm({ ...logForm, appointments_booked: parseInt(e.target.value) || 0 })} className="w-full bg-background border border-blue-500/20 rounded-lg p-3 mt-1 text-center font-mono text-blue-400 font-bold" />
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

                            <div className="space-y-4 pt-4 pb-20">
                                <h3 className="font-bold text-xl">Recent Logs</h3>
                                {partnerData.outreachLogs.length === 0 ? (
                                    <div className="text-center text-muted italic">No logs found.</div>
                                ) : (
                                    partnerData.outreachLogs.slice(0, 20).map((log: any) => (
                                        <div key={log.id} className="bg-surface border border-white/5 p-4 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-muted">
                                                    {['Instagram', 'LinkedIn'].includes(log.medium) ? <Send size={18} /> : <Calendar size={18} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm">{new Date(log.date).toLocaleDateString()}</div>
                                                    <div className="text-xs text-muted">{log.medium} • {log.count} sent</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-green-400 font-bold">{log.interested} Leads</div>
                                                <div className="text-[10px] text-muted">{log.appointments_booked || 0} Booked</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
