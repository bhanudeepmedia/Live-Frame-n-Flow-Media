import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, GrowthPartnerApplication, PartnerData } from '../../services/mockBackend'; // Keep types
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
    Briefcase
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [applications, setApplications] = useState<GrowthPartnerApplication[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [allLeads, setAllLeads] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'leads' | 'payouts' | 'settings'>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

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

        // Fetch all leads (Assuming SupabaseBackend has getAllLeads or we mimic it)
        // Since we didn't add getAllLeads to the service file yet, we might need to add it or hack it here.
        // For now, let's assume we added it or I will use a direct query via Supabase client if I could, but I can't import client here easily.
        // I will MODIFY the previous file first or validly assume I can't use it yet.
        // Let's use the parts.outreachLogs as a proxy for activity for now, and leads will be empty array until I update service.
        // Wait, I can try to use `getLeads` for each partner? No, too slow. 
        // I will rely on `parts` having some data, and applications.

        setApplications([...apps].sort((a, b) => (a.status === 'pending' ? -1 : 1)));
        setPartners(parts);
        setLoading(false);
    };

    const handleLogout = async () => {
        await SupabaseBackend.logout();
        navigate('/growth-partner/login');
    };

    const handleApprove = async (appId: string, status: 'approved' | 'rejected') => {
        if (!confirm(`Are you sure you want to ${status} this application?`)) return;
        await SupabaseBackend.reviewApplication(appId, status);
        refreshData();
    };

    // --- VIEW COMPONENTS ---

    // 1. COMMAND CENTER (Overview)
    const Overview = () => {
        const totalOutreach = partners.reduce((acc, p) => acc + p.outreachLogs.reduce((l: any, log: any) => l + log.count, 0), 0);
        const totalRevenue = partners.reduce((acc, p) => acc + (p.earnings?.total || 0), 0);
        const totalPendingPayout = partners.reduce((acc, p) => acc + (p.earnings?.pending || 0), 0);
        const activePartners = partners.length;

        return (
            <div className="space-y-6 animate-fade-in">
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
                        <div className="text-sm text-muted mb-1">Liability (Pending)</div>
                        <div className="text-3xl font-bold text-yellow-400">₹{totalPendingPayout.toLocaleString()}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface border border-white/10 p-6 rounded-xl">
                        <h3 className="font-bold mb-4">Pending Applications</h3>
                        <div className="space-y-4">
                            {applications.filter(a => a.status === 'pending').length === 0 ? (
                                <div className="text-muted text-sm italic">No pending applications.</div>
                            ) : (
                                applications.filter(a => a.status === 'pending').slice(0, 5).map(app => (
                                    <div key={app.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                                        <div>
                                            <div className="font-bold text-sm">{app.fullName}</div>
                                            <div className="text-xs text-muted">{app.city} • {app.background}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleApprove(app.id, 'approved')} className="text-green-400 hover:bg-green-500/20 p-1 rounded"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleApprove(app.id, 'rejected')} className="text-red-400 hover:bg-red-500/20 p-1 rounded"><XCircle size={16} /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-surface border border-white/10 p-6 rounded-xl">
                        <h3 className="font-bold mb-4">Recent Systems Activity</h3>
                        <div className="text-sm text-muted italic">System logs and alerts will appear here.</div>
                    </div>
                </div>
            </div>
        );
    };

    // 2. PARTNERS MANAGEMENT
    const PartnersManager = () => {
        const filteredPartners = partners.filter(p => {
            const app = applications.find(a => a.id === p.applicationId);
            const name = app?.fullName.toLowerCase() || '';
            return name.includes(searchQuery.toLowerCase());
        });

        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-display font-bold">Growth Partners</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                        <input
                            placeholder="Search partners..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="bg-surface border border-white/10 pl-10 pr-4 py-2 rounded-lg text-sm w-64"
                        />
                    </div>
                </div>

                <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-muted uppercase text-xs">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Outreach</th>
                                <th className="p-4 text-center">Leads</th>
                                <th className="p-4 text-right">Earnings</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredPartners.map(p => {
                                const app = applications.find(a => a.id === p.applicationId);
                                const totalOutreach = p.outreachLogs.reduce((acc: any, l: any) => acc + l.count, 0);
                                const totalLeads = p.outreachLogs.reduce((acc: any, l: any) => acc + l.interested, 0); // Approx

                                return (
                                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold">{app?.fullName || 'Unknown'}</div>
                                            <div className="text-xs text-muted">{p.stage}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-bold">Active</span>
                                        </td>
                                        <td className="p-4 text-center font-mono">{totalOutreach}</td>
                                        <td className="p-4 text-center font-mono">{totalLeads}</td>
                                        <td className="p-4 text-right font-mono text-green-400">₹{p.earnings.total}</td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-muted hover:text-white"><MoreHorizontal size={16} /></button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredPartners.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted">No partners found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // 3. LEADS (Simplified Placeholder as we don't have full leads data flow yet)
    const LeadsOverview = () => (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-display font-bold">Global Leads Oversight</h2>
            <div className="bg-surface border border-white/10 p-12 text-center rounded-xl">
                <Shield size={48} className="mx-auto text-muted mb-4" />
                <h3 className="text-xl font-bold">Centralized Lead Management</h3>
                <p className="text-muted max-w-md mx-auto mb-6">Track every lead submitted by all partners to prevent conflicts and ensure quality.</p>
                <button className="bg-accent text-background px-6 py-2 rounded-lg font-bold opacity-50 cursor-not-allowed">Coming Soon (After DB Update)</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background font-sans text-white flex">
            {/* ADMIN SIDEBAR */}
            <aside className="w-64 bg-surface border-r border-white/5 flex flex-col fixed inset-y-0 z-50">
                <div className="p-6">
                    <div className="font-bold text-xl font-display">Admin<span className="text-accent">Portal</span></div>
                    <div className="text-xs text-muted">Founder Access</div>
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
                {activeTab === 'overview' && <Overview />}
                {activeTab === 'partners' && <PartnersManager />}
                {activeTab === 'leads' && <LeadsOverview />}
                {activeTab === 'payouts' && <div className="p-12 text-center text-muted">Payout Management Module Loading...</div>}
                {activeTab === 'settings' && <div className="p-12 text-center text-muted">System Configuration Module Loading...</div>}
            </main>
        </div>
    );
};

export default AdminDashboard;
