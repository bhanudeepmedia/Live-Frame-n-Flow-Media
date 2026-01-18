import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, GrowthPartnerApplication } from '../../services/mockBackend';
import { SupabaseBackend } from '../../services/supabaseService';
import {
    Users,
    Search,
    CheckCircle,
    XCircle,
    Clock,
    MoreHorizontal,
    LogOut,
    TrendingUp,
    DollarSign,
    Shield,
    FileText,
    Settings,
    AlertTriangle,
    BarChart2,
    Briefcase,
    Bell,
    ExternalLink,
    Filter,
    CreditCard,
    Mail,
    Linkedin,
    Globe // Added Imports
} from 'lucide-react';

// --- SUB-COMPONENTS DEFINED OUTSIDE TO PREVENT RE-RENDER FOCUS LOSS ---

const Overview = ({
    partners,
    allLeads,
    applications,
    broadcastForm,
    setBroadcastForm,
    handlePostBroadcast,
    handleReviewApp,
    broadcasts, // New Prop
    handleDeleteBroadcast // New Prop
}: any) => {
    const totalOutreach = partners.reduce((acc: any, p: any) => acc + p.outreachLogs.reduce((l: any, log: any) => l + log.count, 0), 0);
    const totalRevenue = partners.reduce((acc: any, p: any) => acc + (p.earnings?.total || 0), 0);
    const totalPendingPayout = allLeads.filter((l: any) => l.payout_status === 'pending' && l.status === 'Converted').reduce((acc: any, l: any) => acc + (l.potential_commission || 0), 0);
    const activePartners = partners.length;

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            <h2 className="text-3xl font-display font-bold">Command Center</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface border border-white/10 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-5"><Users size={60} /></div>
                    <div className="text-sm text-muted mb-1">Active GPs</div>
                    <div className="text-3xl font-bold">{activePartners}</div>
                </div>
                <div className="bg-surface border border-white/10 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-5"><TrendingUp size={60} /></div>
                    <div className="text-sm text-muted mb-1">Total Outreach</div>
                    <div className="text-3xl font-bold">{totalOutreach.toLocaleString()}</div>
                </div>
                <div className="bg-surface border border-white/10 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-5"><DollarSign size={60} /></div>
                    <div className="text-sm text-muted mb-1">Attr. Revenue</div>
                    <div className="text-3xl font-bold text-green-400">₹{totalRevenue.toLocaleString()}</div>
                </div>
                <div className="bg-surface border border-white/10 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-5"><AlertTriangle size={60} /></div>
                    <div className="text-sm text-muted mb-1">Liabilities</div>
                    <div className="text-3xl font-bold text-yellow-400">₹{totalPendingPayout.toLocaleString()}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface border border-white/10 p-6 rounded-xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Bell size={18} /> Broadcast Notification</h3>
                    <form onSubmit={handlePostBroadcast} className="space-y-4 mb-8">
                        <input value={broadcastForm.title} onChange={e => setBroadcastForm({ ...broadcastForm, title: e.target.value })} placeholder="Notification Title" className="w-full bg-background border border-white/10 p-3 rounded-lg" required />
                        <textarea value={broadcastForm.message} onChange={e => setBroadcastForm({ ...broadcastForm, message: e.target.value })} placeholder="Message to all partners..." className="w-full bg-background border border-white/10 p-3 rounded-lg h-24" required />
                        <button type="submit" className="bg-accent text-background px-4 py-2 rounded-lg font-bold w-full hover:bg-white text-sm">Send Broadcast</button>
                    </form>

                    <h4 className="text-xs font-bold text-muted uppercase mb-3">Recent Broadcasts</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                        {(!broadcasts || broadcasts.length === 0) && <div className="text-xs text-muted italic">No active broadcasts.</div>}
                        {broadcasts?.map((b: any) => (
                            <div key={b.id} className="flex justify-between items-start bg-white/5 p-3 rounded-lg border border-white/5">
                                <div>
                                    <div className="text-sm font-bold">{b.title}</div>
                                    <div className="text-xs text-muted truncate max-w-[200px]">{b.message}</div>
                                    <div className="text-[10px] text-muted mt-1">{new Date(b.created_at).toLocaleDateString()}</div>
                                </div>
                                <button onClick={() => handleDeleteBroadcast(b.id)} className="text-muted hover:text-red-400 p-1"><XCircle size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface border border-white/10 p-6 rounded-xl">
                    <h3 className="font-bold mb-4">Pending Applications</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                        {applications.filter((a: any) => a.status === 'pending').length === 0 ? <div className="text-muted text-sm italic">No pending apps.</div> : applications.filter((a: any) => a.status === 'pending').map((app: any) => (
                            <div key={app.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                                <div>
                                    <div className="font-bold text-sm">{app.fullName}</div>
                                    <div className="text-xs text-muted">{app.city} • {app.experience ? 'Exp' : 'No Exp'}</div>
                                    <div className="flex gap-2 mt-1">
                                        {app.linkedin && <a href={app.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300"><Linkedin size={12} /></a>}
                                        {app.social && <a href={app.social} target="_blank" rel="noreferrer" className="text-pink-400 hover:text-pink-300"><Globe size={12} /></a>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const subject = "Application Approved - Frame n Flow Media GPP";
                                            const body = `Hello ${app.fullName.split(' ')[0]},\n\nWe are pleased to accept you into the Growth Partner Program.\n\nPlease create your username and password by going into this specific page:\n${window.location.origin}/#/growth-partner/login\n\n(Select 'Create Account' if available or wait for your credentials)\n\nWelcome aboard,\nFrame n Flow Media Team`;
                                            window.location.href = `mailto:${app.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                        }}
                                        className="text-blue-400 p-1 hover:bg-blue-500/20 rounded"
                                        title="Send Acceptance Email"
                                    >
                                        <Mail size={16} />
                                    </button>
                                    <button onClick={() => handleReviewApp(app.id, 'approved')} className="text-green-400 p-1 hover:bg-green-500/20 rounded" title="Approve"><CheckCircle size={16} /></button>
                                    <button onClick={() => handleReviewApp(app.id, 'rejected')} className="text-red-400 p-1 hover:bg-red-500/20 rounded" title="Reject"><XCircle size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PartnersManager = ({
    partners,
    searchQuery,
    setSearchQuery,
    applications,
    allLeads,
    getPartnerName,
    setSelectedPartner
}: any) => {
    const filteredPartners = partners.filter((p: any) => {
        const name = getPartnerName(p.id).toLowerCase();
        return name.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-display font-bold">Growth Partners</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." className="bg-surface border border-white/10 pl-10 pr-4 py-2 rounded-lg text-sm w-64" />
                </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-muted uppercase text-xs">
                        <tr>
                            <th className="p-4">Partner</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Outreach</th>
                            <th className="p-4 text-center">Leads</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredPartners.map((p: any) => {
                            const totalOutreach = p.outreachLogs.reduce((acc: any, l: any) => acc + l.count, 0);
                            const totalLeads = allLeads.filter((l: any) => l.partner_id === p.id).length;
                            return (
                                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold">{getPartnerName(p.id)}</div>
                                        <div className="text-xs text-muted">{p.stage}</div>
                                    </td>
                                    <td className="p-4"><span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">Active</span></td>
                                    <td className="p-4 text-center font-mono">{totalOutreach}</td>
                                    <td className="p-4 text-center font-mono">{totalLeads}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => setSelectedPartner(p)} className="p-2 bg-white/5 rounded hover:bg-white/10 text-xs font-bold">View Profile</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const LeadsTable = ({ allLeads, getPartnerName, refreshData }: any) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-display font-bold">All Leads & Deals</h2>
            <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-muted uppercase text-xs">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Partner</th>
                            <th className="p-4">Business</th>
                            <th className="p-4">Source</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {allLeads.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-muted">No leads recorded.</td></tr> : allLeads.map((lead: any) => (
                            <tr key={lead.id} className="hover:bg-white/5">
                                <td className="p-4 text-muted text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                                <td className="p-4 font-bold">{getPartnerName(lead.partner_id)}</td>
                                <td className="p-4">
                                    <div>{lead.business_name}</div>
                                    <div className="text-xs text-muted">{lead.contact_person}</div>
                                </td>
                                <td className="p-4 text-xs">{lead.source_platform}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${lead.status === 'Converted' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/10 text-blue-400'}`}>{lead.status}</span>
                                    {lead.is_duplicate && <span className="ml-2 bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs">Dupe</span>}
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={async () => {
                                            await SupabaseBackend.updateLeadAdmin(lead.id, { is_duplicate: !lead.is_duplicate });
                                            refreshData();
                                        }}
                                        className="text-xs bg-white/5 px-2 py-1 rounded hover:bg-white/10"
                                    >
                                        {lead.is_duplicate ? 'Un-Flag' : 'Flag Dupe'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

const PayoutsManager = ({ allLeads, getPartnerName, refreshData, adminSettings }: any) => {
    const payableLeads = allLeads.filter((l: any) => l.status === 'Converted');

    const handlePayoutUpdate = async (leadId: string, status: string) => {
        await SupabaseBackend.updateLeadAdmin(leadId, { payout_status: status });
        refreshData();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-display font-bold">Commissions & Payouts</h2>
            <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-muted uppercase text-xs">
                        <tr>
                            <th className="p-4">GP Name</th>
                            <th className="p-4">Deal</th>
                            <th className="p-4">Deal Value</th>
                            <th className="p-4">Commission (20%)</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {payableLeads.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-muted">No converted deals ready for payout.</td></tr> : payableLeads.map((lead: any) => (
                            <tr key={lead.id} className="hover:bg-white/5">
                                <td className="p-4 font-bold">{getPartnerName(lead.partner_id)}</td>
                                <td className="p-4 text-xs">{lead.business_name}</td>
                                <td className="p-4">
                                    <input
                                        placeholder="Set Value"
                                        className="bg-black/20 border border-white/10 rounded w-24 p-1 text-xs"
                                        onBlur={async (e) => {
                                            const val = parseFloat(e.target.value);
                                            if (val) await SupabaseBackend.updateLeadAdmin(lead.id, { deal_value: val, potential_commission: val * (adminSettings.commission_percentage / 100 || 0.2) });
                                            refreshData();
                                        }}
                                        defaultValue={lead.deal_value || ''}
                                    />
                                </td>
                                <td className="p-4 font-bold text-green-400">
                                    ₹{lead.potential_commission?.toLocaleString() || 0}
                                </td>
                                <td className="p-4 uppercase text-xs font-bold">{lead.payout_status || 'Pending'}</td>
                                <td className="p-4 text-right space-x-2">
                                    {lead.payout_status !== 'paid' && (
                                        <button onClick={() => handlePayoutUpdate(lead.id, 'paid')} className="bg-green-500 text-black px-3 py-1 rounded text-xs font-bold hover:bg-green-400">Mark Paid</button>
                                    )}
                                    {lead.payout_status === 'paid' && <span className="text-muted text-xs"><CheckCircle size={14} className="inline mr-1" /> Paid</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

const Configuration = ({ adminSettings, setAdminSettings, handleSaveSettings }: any) => (
    <div className="space-y-6 animate-fade-in max-w-2xl">
        <h2 className="text-3xl font-display font-bold">System Configuration</h2>
        <form onSubmit={handleSaveSettings} className="bg-surface border border-white/10 p-6 rounded-xl space-y-4">
            <div>
                <label className="text-xs text-muted uppercase block mb-1">Commission Percentage (%)</label>
                <input
                    type="number"
                    value={adminSettings.commission_percentage || 20}
                    onChange={e => setAdminSettings({ ...adminSettings, commission_percentage: parseInt(e.target.value) })}
                    className="bg-background border border-white/10 p-3 rounded-lg w-full text-white"
                />
            </div>
            <div>
                <label className="text-xs text-muted uppercase block mb-1">Accepted Platforms (Comma sep)</label>
                <input
                    type="text"
                    value={adminSettings.accepted_platforms?.join(', ') || ''}
                    onChange={e => setAdminSettings({ ...adminSettings, accepted_platforms: e.target.value.split(',').map((s: string) => s.trim()) })}
                    className="bg-background border border-white/10 p-3 rounded-lg w-full text-white"
                />
            </div>
            <button className="bg-accent text-background px-6 py-2 rounded-lg font-bold w-full hover:bg-white mt-4">Save Configuration</button>
        </form>
    </div>
);

// --- MAIN COMPONENT ---

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [applications, setApplications] = useState<GrowthPartnerApplication[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [allLeads, setAllLeads] = useState<any[]>([]);
    const [adminSettings, setAdminSettings] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'leads' | 'payouts' | 'settings'>('overview');

    // UI State
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedPartner, setSelectedPartner] = useState<any | null>(null); // For Profile Modal
    const [broadcastForm, setBroadcastForm] = useState({ title: '', message: '' });
    const [broadcasts, setBroadcasts] = useState<any[]>([]); // New state

    useEffect(() => {
        const init = async () => {
            const currentUser = await SupabaseBackend.getCurrentUser();
            if (!currentUser || currentUser.role !== 'admin') {
                navigate('/growth-partner/login');
                return;
            }
            setUser(currentUser);
            refreshData();
        };
        init();
    }, [navigate]);

    const refreshData = async () => {
        setLoading(true);
        const apps = await SupabaseBackend.getApplications();
        const parts = await SupabaseBackend.getAllPartners();
        const leads = await SupabaseBackend.getAllLeads();
        const settings = await SupabaseBackend.getAdminSettings();
        const bcs = await SupabaseBackend.getBroadcasts();

        setApplications([...apps].sort((a, b) => (a.status === 'pending' ? -1 : 1)));
        setPartners(parts);
        setAllLeads(leads);
        setAdminSettings(settings);
        setBroadcasts(bcs);
        setLoading(false);
    };

    const handleLogout = async () => {
        await SupabaseBackend.logout();
        navigate('/growth-partner/login');
    };

    const handleReviewApp = async (appId: string, status: 'approved' | 'rejected') => {
        if (!confirm(`Are you sure you want to ${status} this application?`)) return;
        await SupabaseBackend.reviewApplication(appId, status);
        refreshData();
    };

    const handlePostBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await SupabaseBackend.sendBroadcast(broadcastForm.title, broadcastForm.message);
        if (error) {
            alert('Error sending notification. Ensure DB Schema is updated.');
        } else {
            alert('Notification sent to all partners!');
            setBroadcastForm({ title: '', message: '' });
            refreshData();
        }
    };

    const handleDeleteBroadcast = async (id: string) => {
        if (!confirm('Delete this broadcast? Partners will no longer see it.')) return;
        await SupabaseBackend.deleteBroadcast(id);
        refreshData();
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        await SupabaseBackend.updateAdminSettings(adminSettings);
        alert('Configuration saved.');
    }

    const getPartnerName = (pid: string) => {
        const p = partners.find(ptr => ptr.id === pid);
        if (!p) return 'Unknown';
        const app = applications.find(a => a.id === p.applicationId);
        return app?.fullName || 'Unknown';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
                <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 animate-pulse">
                    Frame n Flow Media
                </div>
                <div className="text-accent text-sm font-mono tracking-widest uppercase animate-pulse">
                    GPP Admin Portal Loading...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background font-sans text-white flex">
            {/* ADMIN SIDEBAR */}
            <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed inset-y-0 z-40 bg-gradient-to-b from-black via-black to-accent/5">
                <div className="p-6">
                    <div className="font-bold text-xl font-display">Frame n Flow <span className="text-accent">Media</span></div>
                    <div className="text-xs text-muted tracking-widest uppercase mt-1">GPP Admin</div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-accent text-background' : 'text-muted hover:text-white'}`}>
                        <BarChart2 size={18} /> Command Center
                    </button>
                    <button onClick={() => setActiveTab('partners')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'partners' ? 'bg-accent text-background' : 'text-muted hover:text-white'}`}>
                        <Users size={18} /> GP Management
                    </button>
                    <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'leads' ? 'bg-accent text-background' : 'text-muted hover:text-white'}`}>
                        <Briefcase size={18} /> Leads & Deals
                    </button>
                    <button onClick={() => setActiveTab('payouts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'payouts' ? 'bg-accent text-background' : 'text-muted hover:text-white'}`}>
                        <DollarSign size={18} /> Commissions
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-accent text-background' : 'text-muted hover:text-white'}`}>
                        <Settings size={18} /> Configuration
                    </button>
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-white text-sm px-4 py-2 opacity-80 hover:opacity-100 transition-opacity">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-64 p-8">
                {activeTab === 'overview' && <Overview
                    partners={partners}
                    allLeads={allLeads}
                    applications={applications}
                    broadcastForm={broadcastForm}
                    setBroadcastForm={setBroadcastForm}
                    handlePostBroadcast={handlePostBroadcast}
                    handleReviewApp={handleReviewApp}
                    broadcasts={broadcasts}
                    handleDeleteBroadcast={handleDeleteBroadcast}
                />}
                {activeTab === 'partners' && <PartnersManager
                    partners={partners}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    applications={applications}
                    allLeads={allLeads}
                    getPartnerName={getPartnerName}
                    setSelectedPartner={setSelectedPartner}
                />}
                {activeTab === 'leads' && <LeadsTable
                    allLeads={allLeads}
                    getPartnerName={getPartnerName}
                    refreshData={refreshData}
                />}
                {activeTab === 'payouts' && <PayoutsManager
                    allLeads={allLeads}
                    getPartnerName={getPartnerName}
                    refreshData={refreshData}
                    adminSettings={adminSettings}
                />}
                {activeTab === 'settings' && <Configuration
                    adminSettings={adminSettings}
                    setAdminSettings={setAdminSettings}
                    handleSaveSettings={handleSaveSettings}
                />}
            </main>

            {/* PARTNER PROFILE MODAL */}
            <AnimatePresence>
                {selectedPartner && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedPartner(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-surface border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold font-display">{getPartnerName(selectedPartner.id)}</h2>
                                    <p className="text-sm text-accent">{selectedPartner.stage} Partner</p>
                                </div>
                                <button onClick={() => setSelectedPartner(null)} className="text-muted hover:text-white"><XCircle size={24} /></button>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-4 rounded-xl">
                                        <h4 className="text-xs text-muted uppercase mb-2">Contact</h4>
                                        <div className="text-sm font-bold">{selectedPartner.phone || 'N/A'}</div>
                                        <div className="text-sm text-muted">{selectedPartner.timezone || 'IST'}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl">
                                        <h4 className="text-xs text-muted uppercase mb-2">Banking</h4>
                                        <div className="text-sm">UPI: {selectedPartner.bankDetails?.upiId || 'N/A'}</div>
                                        <div className="text-xs text-muted">{selectedPartner.bankDetails?.bankName}</div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Recent Logs</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto border border-white/10 rounded-lg p-2">
                                        {selectedPartner.outreachLogs.slice(0, 10).map((l: any, i: number) => (
                                            <div key={i} className="flex justify-between text-xs p-2 bg-white/5 rounded">
                                                <span>{new Date(l.date).toLocaleDateString()}</span>
                                                <span>{l.count} Sent • {l.interested} Leads</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    <button className="flex-1 bg-red-500/20 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-colors">Suspend Partner</button>
                                    <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20">Reset Password</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
