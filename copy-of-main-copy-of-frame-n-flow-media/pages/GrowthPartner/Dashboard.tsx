import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MockBackend, User, PartnerData, OutreachLog } from '../../services/mockBackend';
import {
    BarChart2,
    Send,
    MessageCircle,
    DollarSign,
    Trophy,
    Target,
    LogOut,
    Plus,
    Save,
    CreditCard
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [logForm, setLogForm] = useState({
        medium: 'Instagram',
        count: 0,
        replies: 0,
        interested: 0,
        notes: ''
    });

    useEffect(() => {
        const currentUser = MockBackend.getCurrentUser();
        if (!currentUser || currentUser.role !== 'partner') {
            navigate('/growth-partner/login');
            return;
        }
        setUser(currentUser);
        loadData(currentUser.partnerId!);
    }, [navigate]);

    const loadData = async (partnerId: string) => {
        const data = await MockBackend.getPartnerData(partnerId);
        setPartnerData(data);
        setLoading(false);
    };

    const handleLogout = () => {
        MockBackend.logout();
        navigate('/growth-partner/login');
    };

    const handleSubmitLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.partnerId) return;

        await MockBackend.logOutreach(user.partnerId, {
            ...logForm,
            date: new Date().toISOString()
        });

        // Refresh data
        loadData(user.partnerId);
        setLogForm({ medium: 'Instagram', count: 0, replies: 0, interested: 0, notes: '' });
    };

    if (loading || !partnerData) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Dashboard...</div>;

    // Calculate stats
    const totalOutreach = partnerData.outreachLogs.reduce((acc, l) => acc + l.count, 0);
    const totalReplies = partnerData.outreachLogs.reduce((acc, l) => acc + l.replies, 0);
    const totalLeads = partnerData.outreachLogs.reduce((acc, l) => acc + l.interested, 0);

    // Gamification progress (Mock logic)
    const nextStageThreshold = totalOutreach < 50 ? 50 : totalOutreach < 100 ? 100 : totalOutreach < 200 ? 200 : 500;
    const progressPercent = Math.min(100, (totalOutreach / nextStageThreshold) * 100);

    return (
        <div className="min-h-screen bg-background font-sans text-white pb-20">
            {/* Top Bar */}
            <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-background font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="font-bold leading-tight">{user?.name}</h1>
                            <div className="text-xs text-muted flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {partnerData.stage}
                            </div>
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

                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row gap-6 md:items-center justify-between"
                >
                    <div>
                        <h2 className="text-3xl font-display font-bold">Dashboard</h2>
                        <p className="text-muted">Let's build growth today.</p>
                    </div>

                    {/* Stage Card */}
                    <div className="bg-surfaceHighlight border border-white/10 p-4 rounded-xl flex items-center gap-4 min-w-[300px]">
                        <div className="p-3 bg-accent/20 rounded-lg text-accent">
                            <Trophy size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-bold opacity-80">{partnerData.stage}</span>
                                <span className="text-muted">{Math.round(progressPercent)}% to next level</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    className="h-full bg-accent"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Outreach", val: totalOutreach, icon: Send, color: "text-blue-400" },
                        { label: "Total Replies", val: totalReplies, icon: MessageCircle, color: "text-purple-400" },
                        { label: "Qualified Leads", val: totalLeads, icon: Target, color: "text-green-400" },
                        { label: "Pending Earnings", val: `$${partnerData.earnings.pending}`, icon: DollarSign, color: "text-yellow-400" }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-surface border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                            <div className="text-3xl font-display font-bold mb-1">{stat.val}</div>
                            <div className="text-sm text-muted">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log Activity Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Plus size={20} className="text-accent" /> Log Activity
                        </h3>

                        <form onSubmit={handleSubmitLog} className="bg-surface border border-white/10 p-6 rounded-2xl space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">Platform</label>
                                    <select
                                        value={logForm.medium}
                                        onChange={e => setLogForm({ ...logForm, medium: e.target.value })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent appearance-none"
                                    >
                                        {['Instagram', 'LinkedIn', 'WhatsApp', 'Email', 'Calls'].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">Outreach Count</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={logForm.count}
                                        onChange={e => setLogForm({ ...logForm, count: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">Replies Received</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={logForm.replies}
                                        onChange={e => setLogForm({ ...logForm, replies: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">Interested Leads</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={logForm.interested}
                                        onChange={e => setLogForm({ ...logForm, interested: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted">Notes (Optional)</label>
                                <textarea
                                    rows={2}
                                    value={logForm.notes}
                                    onChange={e => setLogForm({ ...logForm, notes: e.target.value })}
                                    className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent resize-none"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2"
                                >
                                    <Save size={18} /> Save Entry
                                </button>
                            </div>
                        </form>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Recent Activity</h3>
                            <div className="space-y-3">
                                {partnerData.outreachLogs.length === 0 ? (
                                    <div className="text-muted italic">No activity logged yet. Start today!</div>
                                ) : (
                                    partnerData.outreachLogs.slice(0, 5).map(log => (
                                        <div key={log.id} className="bg-surface/50 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-muted">
                                                    {log.medium === 'Instagram' ? <MessageCircle size={18} /> : <Send size={18} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{log.medium} Outreach</div>
                                                    <div className="text-xs text-muted">{new Date(log.date).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-accent font-bold">+{log.count} Sent</div>
                                                <div className="text-xs text-green-400">{log.interested} Leads</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Earnings / Bank */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-surface to-surfaceHighlight border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <DollarSign size={100} />
                            </div>
                            <h3 className="text-lg font-bold mb-4">Total Earnings</h3>
                            <div className="text-4xl font-display font-bold mb-2">${partnerData.earnings.total}</div>
                            <div className="flex gap-4 text-sm mb-6">
                                <div>
                                    <div className="text-muted">Paid</div>
                                    <div className="font-bold text-green-400">${partnerData.earnings.paid}</div>
                                </div>
                                <div>
                                    <div className="text-muted">Pending</div>
                                    <div className="font-bold text-yellow-400">${partnerData.earnings.pending}</div>
                                </div>
                            </div>
                            <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                                Request Payout
                            </button>
                        </div>

                        <div className="bg-surface border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <CreditCard size={18} /> Bank Details
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-background p-3 rounded-lg text-sm">
                                    <div className="text-muted text-xs mb-1">Account Holder</div>
                                    <div>{partnerData.bankDetails?.accountHolder || 'Not set'}</div>
                                </div>
                                <div className="bg-background p-3 rounded-lg text-sm">
                                    <div className="text-muted text-xs mb-1">Account Number</div>
                                    <div className="font-mono">{partnerData.bankDetails?.accountNumber ? '•••• ' + partnerData.bankDetails.accountNumber.slice(-4) : 'Not set'}</div>
                                </div>
                                <button className="w-full text-xs text-accent hover:underline">Update Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
