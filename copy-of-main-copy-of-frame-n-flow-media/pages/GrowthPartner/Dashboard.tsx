import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, PartnerData, OutreachLog } from '../../services/mockBackend';
import { SupabaseBackend } from '../../services/supabaseService';
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
    CreditCard,
    Edit2,
    Trash2,
    X,
    Calendar,
    ChevronDown,
    ChevronUp
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
        notes: '',
        date: new Date().toISOString().split('T')[0] // Default to today YYYY-MM-DD
    });

    // Bank Details Editing
    const [isEditingBank, setIsEditingBank] = useState(false);
    const [bankForm, setBankForm] = useState<any>({});

    // Log Editing
    const [editingLogId, setEditingLogId] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            const currentUser = await SupabaseBackend.getCurrentUser();
            if (!currentUser || currentUser.role !== 'partner') {
                navigate('/growth-partner/login');
                return;
            }
            setUser(currentUser);
            if (currentUser.partnerId) loadData(currentUser.partnerId);
        };
        init();
    }, [navigate]);

    const loadData = async (partnerId: string) => {
        const data = await SupabaseBackend.getPartnerData(partnerId);
        if (data) {
            setPartnerData(data);
            setBankForm(data.bankDetails || {});
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await SupabaseBackend.logout();
        navigate('/growth-partner/login');
    };

    const handleSubmitLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.partnerId) return;

        if (editingLogId) {
            // Update existing log
            await SupabaseBackend.updateLog(editingLogId, {
                ...logForm,
                // Ensure date is ISO
                date: new Date(logForm.date).toISOString()
            });
            setEditingLogId(null);
        } else {
            // Create new log
            await SupabaseBackend.logOutreach(user.partnerId, {
                ...logForm,
                date: new Date(logForm.date).toISOString()
            });
        }

        // Refresh data
        loadData(user.partnerId);
        setLogForm({
            medium: 'Instagram',
            count: 0,
            replies: 0,
            interested: 0,
            notes: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    const handleDeleteLog = async (logId: string) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;
        await SupabaseBackend.deleteLog(logId);
        if (user?.partnerId) loadData(user.partnerId);
    };

    const handleEditLogInit = (log: OutreachLog) => {
        setEditingLogId(log.id);
        setLogForm({
            medium: log.medium,
            count: log.count,
            replies: log.replies,
            interested: log.interested,
            notes: log.notes || '',
            date: new Date(log.date).toISOString().split('T')[0]
        });
        // Scroll to form (optional)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSaveBankDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.partnerId) return;

        await SupabaseBackend.updateBankDetails(user.partnerId, bankForm);
        setIsEditingBank(false);
        loadData(user.partnerId);
    };

    const canEditLog = (dateStr: string) => {
        const logDate = new Date(dateStr);
        const now = new Date();
        const diffHours = (now.getTime() - logDate.getTime()) / (1000 * 60 * 60);
        return diffHours <= 48; // Allow editing for 48 hours
    };

    if (loading || !partnerData) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Dashboard...</div>;

    // Calculate stats
    const totalOutreach = partnerData.outreachLogs.reduce((acc, l) => acc + l.count, 0);
    const totalReplies = partnerData.outreachLogs.reduce((acc, l) => acc + l.replies, 0);
    const totalLeads = partnerData.outreachLogs.reduce((acc, l) => acc + l.interested, 0);

    // Gamification progress
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


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log Activity Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            {editingLogId ? <Edit2 size={20} className="text-yellow-400" /> : <Plus size={20} className="text-accent" />}
                            {editingLogId ? 'Edit Activity Entry' : 'Log Activity'}
                        </h3>

                        <form onSubmit={handleSubmitLog} className={`bg-surface border ${editingLogId ? 'border-yellow-500/50' : 'border-white/10'} p-6 rounded-2xl space-y-6 transition-colors`}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={logForm.date}
                                        onChange={e => setLogForm({ ...logForm, date: e.target.value })}
                                        className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent text-white scheme-dark"
                                    />
                                </div>
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

                            <div className="flex justify-end gap-3">
                                {editingLogId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingLogId(null);
                                            setLogForm({ medium: 'Instagram', count: 0, replies: 0, interested: 0, notes: '', date: new Date().toISOString().split('T')[0] });
                                        }}
                                        className="px-6 py-3 bg-white/5 text-muted font-bold rounded-lg hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2"
                                >
                                    <Save size={18} /> {editingLogId ? 'Update Entry' : 'Save Entry'}
                                </button>
                            </div>
                        </form>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Recent Activity</h3>
                            <div className="space-y-3">
                                {partnerData.outreachLogs.length === 0 ? (
                                    <div className="text-muted italic">No activity logged yet. Start today!</div>
                                ) : (
                                    partnerData.outreachLogs.slice(0, 10).map(log => (
                                        <div key={log.id} className="bg-surface/50 border border-white/5 p-4 rounded-xl flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-muted">
                                                    {log.medium === 'Instagram' ? <MessageCircle size={18} /> :
                                                        log.medium === 'LinkedIn' ? <Send size={18} /> :
                                                            <BarChart2 size={18} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{log.medium} Outreach</div>
                                                    <div className="text-xs text-muted">
                                                        {new Date(log.date).toLocaleDateString()}
                                                        {log.notes && <span className="ml-2 opacity-50 truncate max-w-[150px] inline-block align-bottom">- {log.notes}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="font-mono text-accent font-bold">+{log.count}</div>
                                                    <div className="text-xs text-green-400">{log.interested} Leads</div>
                                                </div>

                                                {/* Edit/Delete Actions - Only if recent */}
                                                {canEditLog(log.date) && (
                                                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEditLogInit(log)}
                                                            className="p-2 hover:bg-white/10 rounded-lg text-muted hover:text-white" title="Edit"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLog(log.id)}
                                                            className="p-2 hover:bg-red-500/20 rounded-lg text-muted hover:text-red-500" title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
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
                            <div className="text-4xl font-display font-bold mb-2">₹{partnerData.earnings.total}</div>
                            <div className="flex gap-4 text-sm mb-6">
                                <div>
                                    <div className="text-muted">Paid</div>
                                    <div className="font-bold text-green-400">₹{partnerData.earnings.paid}</div>
                                </div>
                                <div>
                                    <div className="text-muted">Pending</div>
                                    <div className="font-bold text-yellow-400">₹{partnerData.earnings.pending}</div>
                                </div>
                            </div>
                            <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                                Request Payout
                            </button>
                        </div>

                        {/* Bank Details Section */}
                        <div className="bg-surface border border-white/10 p-6 rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <CreditCard size={18} /> Payment Info
                                </h3>
                                <button
                                    onClick={() => setIsEditingBank(!isEditingBank)}
                                    className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-muted hover:text-white"
                                >
                                    {isEditingBank ? 'Cancel' : 'Edit'}
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {isEditingBank ? (
                                    <motion.form
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        onSubmit={handleSaveBankDetails}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-1">
                                            <label className="text-xs text-muted">UPI ID (Preferred)</label>
                                            <input
                                                type="text"
                                                value={bankForm.upiId || ''}
                                                onChange={e => setBankForm({ ...bankForm, upiId: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded p-2 text-sm focus:border-accent focus:outline-none"
                                                placeholder="username@upi"
                                            />
                                        </div>
                                        <hr className="border-white/5" />
                                        <div className="space-y-1">
                                            <label className="text-xs text-muted">Bank Name</label>
                                            <input
                                                type="text"
                                                value={bankForm.bankName || ''}
                                                onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded p-2 text-sm focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-muted">Account Number</label>
                                            <input
                                                type="text"
                                                value={bankForm.accountNumber || ''}
                                                onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded p-2 text-sm focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-muted">IFSC Code</label>
                                            <input
                                                type="text"
                                                value={bankForm.ifsc || ''}
                                                onChange={e => setBankForm({ ...bankForm, ifsc: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded p-2 text-sm focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                        <button type="submit" className="w-full py-2 bg-accent text-background font-bold rounded hover:bg-white text-sm">Save Details</button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4"
                                    >
                                        {Object.keys(partnerData.bankDetails).length === 0 ? (
                                            <div className="text-center py-4 bg-background/50 rounded-lg border border-dashed border-white/10">
                                                <p className="text-sm text-muted">No payment details added.</p>
                                                <button onClick={() => setIsEditingBank(true)} className="text-accent text-sm hover:underline mt-1">Add details</button>
                                            </div>
                                        ) : (
                                            <>
                                                {partnerData.bankDetails.upiId && (
                                                    <div className="bg-background p-3 rounded-lg text-sm">
                                                        <div className="text-muted text-xs mb-1">UPI ID</div>
                                                        <div className="font-mono">{partnerData.bankDetails.upiId}</div>
                                                    </div>
                                                )}
                                                {partnerData.bankDetails.accountNumber && (
                                                    <div className="bg-background p-3 rounded-lg text-sm">
                                                        <div className="text-muted text-xs mb-1">Bank Transfer</div>
                                                        <div className="font-bold">{partnerData.bankDetails.bankName}</div>
                                                        <div className="font-mono text-muted text-xs">{partnerData.bankDetails.accountNumber}</div>
                                                        <div className="font-mono text-muted text-xs">{partnerData.bankDetails.ifsc}</div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
