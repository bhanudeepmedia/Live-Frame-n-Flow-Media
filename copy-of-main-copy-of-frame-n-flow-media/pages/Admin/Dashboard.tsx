import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MockBackend, User, GrowthPartnerApplication, PartnerData } from '../../services/mockBackend';
import {
    Users,
    Search,
    CheckCircle,
    XCircle,
    Clock,
    MoreHorizontal,
    LogOut,
    TrendingUp,
    DollarSign
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [applications, setApplications] = useState<GrowthPartnerApplication[]>([]);
    const [partners, setPartners] = useState<PartnerData[]>([]);
    const [activeTab, setActiveTab] = useState<'applications' | 'partners'>('applications');

    useEffect(() => {
        const currentUser = MockBackend.getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/growth-partner/login');
            return;
        }
        setUser(currentUser);
        refreshData();
    }, [navigate]);

    const refreshData = async () => {
        const apps = await MockBackend.getApplications();
        const parts = await MockBackend.getAllPartners();
        // Sort apps: pending first
        setApplications([...apps].sort((a, b) => (a.status === 'pending' ? -1 : 1)));
        setPartners(parts);
    };

    const handleLogout = () => {
        MockBackend.logout();
        navigate('/growth-partner/login');
    };

    const handleReview = async (appId: string, status: 'approved' | 'rejected') => {
        await MockBackend.reviewApplication(appId, status);
        refreshData();
    };

    // Stats
    const totalPartners = partners.length;
    const pendingApps = applications.filter(a => a.status === 'pending').length;
    // Calculate specific totals if log data available in mocked partner objects
    const totalOutreachGlobal = partners.reduce((acc, p) => acc + p.outreachLogs.reduce((lAcc, l) => lAcc + l.count, 0), 0);

    return (
        <div className="min-h-screen bg-background font-sans text-white pb-20">
            {/* Top Bar */}
            <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div>
                            <h1 className="font-bold leading-tight">Admin Portal</h1>
                            <div className="text-xs text-muted">Frame n Flow Media</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-white"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="pt-28 px-6 max-w-7xl mx-auto space-y-8">

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-muted text-sm">Total Partners</div>
                            <Users size={18} className="text-accent" />
                        </div>
                        <div className="text-3xl font-display font-bold">{totalPartners}</div>
                    </div>
                    <div className="bg-surface border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-muted text-sm">Pending Applications</div>
                            <Clock size={18} className="text-yellow-400" />
                        </div>
                        <div className="text-3xl font-display font-bold">{pendingApps}</div>
                    </div>
                    <div className="bg-surface border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-muted text-sm">Global Outreach Scale</div>
                            <TrendingUp size={18} className="text-green-400" />
                        </div>
                        <div className="text-3xl font-display font-bold">{totalOutreachGlobal}</div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div>
                    <div className="flex gap-6 border-b border-white/10 mb-6">
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'applications' ? 'text-white' : 'text-muted hover:text-white'
                                }`}
                        >
                            Applications
                            {activeTab === 'applications' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('partners')}
                            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'partners' ? 'text-white' : 'text-muted hover:text-white'
                                }`}
                        >
                            Active Partners
                            {activeTab === 'partners' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'applications' ? (
                            <motion.div
                                key="apps"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-surface border border-white/10 rounded-xl overflow-hidden"
                            >
                                <table className="w-full text-left text-sm mobile-table">
                                    <thead className="bg-white/5 text-muted border-b border-white/10">
                                        <tr>
                                            <th className="p-4 font-medium">Name</th>
                                            <th className="p-4 font-medium">Details</th>
                                            <th className="p-4 font-medium">Experience</th>
                                            <th className="p-4 font-medium">Status</th>
                                            <th className="p-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {applications.length === 0 && (
                                            <tr><td colSpan={5} className="p-8 text-center text-muted">No applications found.</td></tr>
                                        )}
                                        {applications.map(app => (
                                            <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-bold">{app.fullName}</div>
                                                    <div className="text-xs text-muted">{app.email}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-xs">{app.city}</div>
                                                    <div className="text-xs text-muted capitalize">{app.background}</div>
                                                </td>
                                                <td className="p-4">
                                                    {app.experience ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">Sales Exp</span>
                                                    ) : (
                                                        <span className="text-muted text-xs">None</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs capitalize
                            ${app.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                            ${app.status === 'approved' ? 'bg-green-500/10 text-green-500' : ''}
                            ${app.status === 'rejected' ? 'bg-red-500/10 text-red-500' : ''}
                          `}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right space-x-2">
                                                    {app.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleReview(app.id, 'approved')}
                                                                className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                                                                title="Approve"
                                                            >
                                                                <CheckCircle size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReview(app.id, 'rejected')}
                                                                className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="partners"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-surface border border-white/10 rounded-xl overflow-hidden"
                            >
                                <div className="p-4 border-b border-white/5">
                                    <h3 className="font-bold">Active Growth Partners</h3>
                                </div>
                                {/* Simplified list for partner management */}
                                <div className="divide-y divide-white/5">
                                    {partners.map(p => {
                                        const app = applications.find(a => a.id === p.applicationId);
                                        return (
                                            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                                                        {app?.fullName.charAt(0) || 'P'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{app?.fullName}</div>
                                                        <div className="text-xs text-muted">Stage: {p.stage}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="text-center">
                                                        <div className="text-muted text-xs">Outreach</div>
                                                        <div className="font-mono">{p.outreachLogs.reduce((acc, l) => acc + l.count, 0)}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-muted text-xs">Earnings</div>
                                                        <div className="font-mono text-green-400">${p.earnings.total}</div>
                                                    </div>
                                                    <button className="p-2 hover:bg-white/10 rounded-full">
                                                        <MoreHorizontal size={18} className="text-muted" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {partners.length === 0 && (
                                        <div className="p-8 text-center text-muted">No active partners yet. Approve applications to add them here.</div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
