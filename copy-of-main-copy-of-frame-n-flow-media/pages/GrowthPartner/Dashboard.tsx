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
    MapPin,
    Briefcase,
    Flame,
    UserCircle,
    Camera
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
        date: new Date().toISOString().split('T')[0],
        location: '',
        niche: ''
    });

    // Edit UI States
    const [isEditingBank, setIsEditingBank] = useState(false);
    const [bankForm, setBankForm] = useState<any>({});
    const [editingLogId, setEditingLogId] = useState<string | null>(null);

    // Profile Image State
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        const init = async () => {
            const currentUser = await SupabaseBackend.getCurrentUser();
            if (!currentUser || currentUser.role !== 'partner') {
                navigate('/growth-partner/login');
                return;
            }
            setUser(currentUser);
            // We assume user object might have an avatar_url if we fetched it, 
            // but for now we might need to fetch profile specifically or rely on SupabaseBackend to attach it.
            // Let's assume user.avatarUrl exists in our enhanced User type, or we fetch it.
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

        const submissionData = {
            ...logForm,
            date: new Date(logForm.date).toISOString()
        };

        if (editingLogId) {
            await SupabaseBackend.updateLog(editingLogId, submissionData);
            setEditingLogId(null);
        } else {
            await SupabaseBackend.logOutreach(user.partnerId, submissionData);
        }

        loadData(user.partnerId);
        // Reset form but keep location/niche/medium as they likely don't change often
        setLogForm(prev => ({
            ...prev,
            count: 0,
            replies: 0,
            interested: 0,
            notes: '',
            date: new Date().toISOString().split('T')[0]
        }));
    };

    const handleDeleteLog = async (logId: string) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;
        await SupabaseBackend.deleteLog(logId);
        if (user?.partnerId) loadData(user.partnerId);
    };

    const handleEditLogInit = (log: OutreachLog | any) => {
        setEditingLogId(log.id);
        setLogForm({
            medium: log.medium,
            count: log.count,
            replies: log.replies,
            interested: log.interested,
            notes: log.notes || '',
            date: new Date(log.date).toISOString().split('T')[0],
            location: log.location || '',
            niche: log.niche || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSaveBankDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.partnerId) return;
        await SupabaseBackend.updateBankDetails(user.partnerId, bankForm);
        setIsEditingBank(false);
        loadData(user.partnerId);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        await SupabaseBackend.updateProfile(user.id, { avatar_url: avatarUrl });
        setShowProfileEdit(false);
        // Reload page to reflect changes nicely or update local state
        window.location.reload();
    };

    // --- Helpers ---
    const canEditLog = (dateStr: string) => {
        const logDate = new Date(dateStr);
        const now = new Date();
        const diffHours = (now.getTime() - logDate.getTime()) / (1000 * 60 * 60);
        return diffHours <= 48;
    };

    const calculateStreak = (logs: any[]) => {
        if (!logs || logs.length === 0) return 0;

        // Sort logs by date descending
        const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Get unique dates
        const uniqueDates = Array.from(new Set(sortedLogs.map(l => new Date(l.date).toLocaleDateString())));

        let streak = 0;
        const today = new Date().toLocaleDateString();
        const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

        // Check if active today or yesterday to start streak
        if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
            streak = 1;
            let checksDate = new Date(uniqueDates[0]);

            for (let i = 1; i < uniqueDates.length; i++) {
                const prevDate = new Date(checksDate);
                prevDate.setDate(prevDate.getDate() - 1);

                if (uniqueDates[i] === prevDate.toLocaleDateString()) {
                    streak++;
                    checksDate = prevDate;
                } else {
                    break;
                }
            }
        }
        return streak;
    };

    // Group logs by Month
    const groupedLogs = partnerData?.outreachLogs.reduce((acc: any, log) => {
        const monthYear = new Date(log.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[monthYear]) acc[monthYear] = [];
        acc[monthYear].push(log);
        return acc;
    }, {}) || {};

    if (loading || !partnerData) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Portal...</div>;

    const streak = calculateStreak(partnerData.outreachLogs);

    return (
        <div className="min-h-screen bg-background font-sans text-white pb-20">
            {/* Cleaner Header - Floating Controls */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
                <div className="relative group">
                    <button
                        onClick={() => setShowProfileEdit(!showProfileEdit)}
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 hover:border-accent transition-colors bg-surface"
                    >
                        {/* We can display avatar here if we had it in user object, currently showing initial */}
                        <div className="w-full h-full flex items-center justify-center bg-accent text-background font-bold text-xl">
                            {user?.name.charAt(0)}
                        </div>
                    </button>
                    {/* Add Photo Hint */}
                    {!showProfileEdit && (
                        <div className="absolute top-14 right-0 w-max bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                            Edit Profile
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="p-3 bg-surface/80 backdrop-blur border border-white/10 rounded-full hover:bg-white/10 transition-colors text-muted hover:text-white"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* Profile Edit Modal (Simple) */}
            <AnimatePresence>
                {showProfileEdit && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed top-20 right-6 z-50 bg-surface border border-white/10 p-4 rounded-xl shadow-xl w-72"
                    >
                        <h4 className="font-bold mb-2">Update Profile Image</h4>
                        <form onSubmit={handleUpdateProfile} className="space-y-3">
                            <input
                                type="url"
                                placeholder="Paste Image URL..."
                                value={avatarUrl}
                                onChange={e => setAvatarUrl(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded p-2 text-sm focus:border-accent outline-none"
                            />
                            <p className="text-xs text-muted">Copy an image link from Discord, LinkedIn, etc.</p>
                            <button className="w-full py-2 bg-accent text-background font-bold rounded text-sm hover:bg-white">Save Image</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-20 px-6 max-w-5xl mx-auto space-y-10">

                {/* Header Section */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-accent tracking-widest text-xs font-bold uppercase">Growth Partner Portal</span>
                        <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full text-xs font-bold border border-orange-500/20">
                            <Flame size={12} fill="currentColor" /> {streak} Day Streak
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Welcome back, {user?.name.split(' ')[0]}</h1>
                    <p className="text-muted max-w-xl">Track your outreach, manage your earnings, and grow your network. Consistency is key.</p>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-surface border border-white/5 p-4 rounded-xl">
                        <div className="text-muted text-xs mb-1">Total Outreach</div>
                        <div className="text-2xl font-bold">{partnerData.outreachLogs.reduce((acc, l) => acc + l.count, 0)}</div>
                    </div>
                    <div className="bg-surface border border-white/5 p-4 rounded-xl">
                        <div className="text-muted text-xs mb-1">Total Leads</div>
                        <div className="text-2xl font-bold text-green-400">{partnerData.outreachLogs.reduce((acc, l) => acc + l.interested, 0)}</div>
                    </div>
                    <div className="bg-surface border border-white/5 p-4 rounded-xl">
                        <div className="text-muted text-xs mb-1">Earnings</div>
                        <div className="text-2xl font-bold text-yellow-400">₹{partnerData.earnings.total}</div>
                    </div>
                    <div className="bg-surface border border-white/5 p-4 rounded-xl">
                        <div className="text-muted text-xs mb-1">Current Stage</div>
                        <div className="text-2xl font-bold text-accent">{partnerData.stage}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log Activity Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* THE FORM */}
                        <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <h3 className="font-bold flex items-center gap-2">
                                    {editingLogId ? <Edit2 size={18} className="text-yellow-400" /> : <Plus size={18} className="text-accent" />}
                                    {editingLogId ? 'Edit Log Entry' : 'Log New Activity'}
                                </h3>
                                {editingLogId && (
                                    <button onClick={() => { setEditingLogId(null); setLogForm(prev => ({ ...prev, notes: '', count: 0, replies: 0, interested: 0 })); }} className="text-xs text-muted hover:text-white">Cancel Edit</button>
                                )}
                            </div>
                            <form onSubmit={handleSubmitLog} className="p-6 space-y-6">
                                {/* Row 1: Date & Platform */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                            <input
                                                type="date"
                                                required
                                                value={logForm.date}
                                                onChange={e => setLogForm({ ...logForm, date: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-accent text-white scheme-dark"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Platform</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                                                {logForm.medium === 'Instagram' ? <MessageCircle size={16} /> : <Send size={16} />}
                                            </div>
                                            <select
                                                value={logForm.medium}
                                                onChange={e => setLogForm({ ...logForm, medium: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-accent appearance-none"
                                            >
                                                {['Instagram', 'LinkedIn', 'WhatsApp', 'Email', 'Calls'].map(m => (
                                                    <option key={m} value={m}>{m}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Location & Niche */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Target Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                            <input
                                                type="text"
                                                placeholder="e.g. New York, USA"
                                                value={logForm.location}
                                                onChange={e => setLogForm({ ...logForm, location: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-accent"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Target Niche</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                            <input
                                                type="text"
                                                placeholder="e.g. Real Estate"
                                                value={logForm.niche}
                                                onChange={e => setLogForm({ ...logForm, niche: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-accent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Stats */}
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Sent</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={logForm.count}
                                            onChange={e => setLogForm({ ...logForm, count: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent font-mono text-center"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Replies</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={logForm.replies}
                                            onChange={e => setLogForm({ ...logForm, replies: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-background border border-white/10 rounded-lg p-3 focus:outline-none focus:border-accent font-mono text-center"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-green-400 uppercase tracking-wider">Leads</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={logForm.interested}
                                            onChange={e => setLogForm({ ...logForm, interested: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-background border border-green-500/30 rounded-lg p-3 focus:outline-none focus:border-green-400 text-green-400 font-bold font-mono text-center"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-accent text-background font-bold rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 text-lg"
                                >
                                    <Save size={20} /> {editingLogId ? 'Update Log' : 'Save Daily Log'}
                                </button>
                            </form>
                        </div>

                        {/* MONTHLY FEED */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold tracking-tight">Performance History</h3>
                            {Object.keys(groupedLogs).length === 0 ? (
                                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl text-muted">
                                    No history yet. Log your first activity!
                                </div>
                            ) : (
                                Object.entries(groupedLogs).map(([month, logs]: [string, any]) => (
                                    <div key={month} className="space-y-3">
                                        <div className="sticky top-20 z-10 bg-background/95 backdrop-blur py-2 px-1 border-b border-white/5 text-sm font-bold text-muted uppercase tracking-widest">
                                            {month}
                                        </div>
                                        {logs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((log: any) => (
                                            <div key={log.id} className="bg-surface border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-white/10 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-muted shrink-0">
                                                        {log.medium === 'Instagram' ? <MessageCircle size={18} /> :
                                                            log.medium === 'LinkedIn' ? <Send size={18} /> :
                                                                <BarChart2 size={18} />}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold">{log.medium}</span>
                                                            <span className="text-xs text-muted">• {new Date(log.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="text-xs text-muted mt-1 flex flex-wrap gap-2">
                                                            {log.location && <span className="flex items-center gap-1"><MapPin size={10} /> {log.location}</span>}
                                                            {log.niche && <span className="flex items-center gap-1"><Briefcase size={10} /> {log.niche}</span>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                                    <div className="text-center">
                                                        <div className="text-xs text-muted uppercase">Sent</div>
                                                        <div className="font-mono font-bold">{log.count}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-xs text-muted uppercase">Replies</div>
                                                        <div className="font-mono font-bold">{log.replies}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-xs text-green-500 uppercase">Leads</div>
                                                        <div className="font-mono font-bold text-green-400">{log.interested}</div>
                                                    </div>

                                                    {/* Actions */}
                                                    {canEditLog(log.date) && (
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pl-2 border-l border-white/10">
                                                            <button
                                                                onClick={() => handleEditLogInit(log)}
                                                                className="p-2 hover:bg-white/10 rounded text-muted hover:text-white"
                                                            >
                                                                <Edit2 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteLog(log.id)}
                                                                className="p-2 hover:bg-red-500/10 rounded text-muted hover:text-red-500"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Earnings & Bank */}
                    <div className="space-y-6">
                        {/* BANK DETAILS */}
                        <div className="bg-surface border border-white/10 p-6 rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <CreditCard size={18} /> Payout Details
                                </h3>
                                <button
                                    onClick={() => setIsEditingBank(!isEditingBank)}
                                    className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-muted hover:text-white"
                                >
                                    {isEditingBank ? 'Cancel' : 'Edit Info'}
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
                                            <label className="text-xs text-muted">IFSC / Routing Code</label>
                                            <input
                                                type="text"
                                                value={bankForm.ifsc || ''}
                                                onChange={e => setBankForm({ ...bankForm, ifsc: e.target.value })}
                                                className="w-full bg-background border border-white/10 rounded p-2 text-sm focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                        <button type="submit" className="w-full py-2 bg-accent text-background font-bold rounded hover:bg-white text-sm">Save Payment Info</button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4"
                                    >
                                        {Object.keys(partnerData.bankDetails || {}).length === 0 ? (
                                            <div className="text-center py-6 bg-background/50 rounded-lg border border-dashed border-white/10">
                                                <p className="text-sm text-muted mb-2">No payment details added yet.</p>
                                                <button onClick={() => setIsEditingBank(true)} className="px-4 py-2 bg-white/5 rounded text-sm hover:bg-white/10">Add Payment Info</button>
                                            </div>
                                        ) : (
                                            <div className="bg-background/50 p-4 rounded-xl space-y-3">
                                                {partnerData.bankDetails.upiId && (
                                                    <div>
                                                        <div className="text-muted text-xs uppercase tracking-wider mb-1">UPI ID</div>
                                                        <div className="font-mono">{partnerData.bankDetails.upiId}</div>
                                                    </div>
                                                )}
                                                {partnerData.bankDetails.accountNumber && (
                                                    <div>
                                                        <hr className="border-white/5 my-2" />
                                                        <div className="text-muted text-xs uppercase tracking-wider mb-1">Bank Transfer</div>
                                                        <div className="font-bold">{partnerData.bankDetails.bankName}</div>
                                                        <div className="font-mono text-muted text-xs">A/C: {partnerData.bankDetails.accountNumber}</div>
                                                        <div className="font-mono text-muted text-xs">IFSC: {partnerData.bankDetails.ifsc}</div>
                                                    </div>
                                                )}
                                            </div>
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
