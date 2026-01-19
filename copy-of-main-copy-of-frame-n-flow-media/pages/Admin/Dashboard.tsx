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
    Globe,
    Trash2,
    RotateCcw,
    Menu,
    X
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

    // Calculate total revenue from deal values (actual revenue attributed to partners)
    const totalRevenue = partners.reduce((acc: any, p: any) => {
        const earningsHistory = p.earningsHistory || [];
        const partnerTotal = earningsHistory
            .filter((e: any) => e.status === 'paid' || e.status === 'approved' || e.status === 'pending')
            .reduce((sum: number, e: any) => sum + Number(e.dealValue || 0), 0);
        return acc + partnerTotal;
    }, 0);

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
                                        {app.linkedin && <a href={app.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300" title="LinkedIn Profile"><Linkedin size={14} /></a>}
                                        {app.social && <a href={app.social} target="_blank" rel="noreferrer" className="text-pink-400 hover:text-pink-300" title="Social Profile"><Globe size={14} /></a>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const subject = "Application Approved - Frame n Flow Media GPP";
                                            const body = `Hello ${app.fullName.split(' ')[0]},\n\nWe are pleased to accept you into the Growth Partner Program.\n\nPlease activate your account by creating your credentials here:\n${window.location.origin}/#/growth-partner/signup\n\n(This link allows you to set your password)\n\nWelcome aboard,\nFrame n Flow Media Team`;
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
    setSelectedPartner,
    handleDeletePartner
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

            <div className="bg-surface border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
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
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => setSelectedPartner(p)} className="p-2 bg-white/5 rounded hover:bg-white/10 text-xs font-bold">View Profile</button>
                                            <button onClick={() => handleDeletePartner(p.id, getPartnerName(p.id))} className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 text-xs font-bold" title="Delete Partner"><Trash2 size={14} /></button>
                                        </div>
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
            <h2 className="text-2xl md:text-3xl font-display font-bold">All Leads & Deals</h2>

            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block bg-surface border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
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

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-3">
                {allLeads.length === 0 ? (
                    <div className="bg-surface border border-white/10 rounded-xl p-8 text-center text-muted">No leads recorded.</div>
                ) : allLeads.map((lead: any) => (
                    <div key={lead.id} className="bg-surface border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="font-bold text-base">{lead.business_name}</div>
                                <div className="text-xs text-muted mt-1">{lead.contact_person}</div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${lead.status === 'Converted' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/10 text-blue-400'}`}>
                                    {lead.status}
                                </span>
                                {lead.is_duplicate && <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs">Duplicate</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <div className="text-muted">Partner</div>
                                <div className="font-semibold">{getPartnerName(lead.partner_id)}</div>
                            </div>
                            <div>
                                <div className="text-muted">Source</div>
                                <div className="font-semibold">{lead.source_platform}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-muted">Date</div>
                                <div className="font-mono text-xs">{new Date(lead.created_at).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-white/10">
                            <button
                                onClick={async () => {
                                    await SupabaseBackend.updateLeadAdmin(lead.id, { is_duplicate: !lead.is_duplicate });
                                    refreshData();
                                }}
                                className="w-full px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-xs font-bold transition-colors"
                            >
                                {lead.is_duplicate ? 'Un-Flag Duplicate' : 'Flag as Duplicate'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const CommissionsManager = ({ partners, getPartnerName, refreshData }: any) => {
    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState({ partnerId: '', clientName: '', dealValue: '', commissionPerc: 20, serviceType: 'Standard Service', date: new Date().toISOString().split('T')[0] });

    // Aggregate Earnings from all partners
    const allEarnings = partners?.flatMap((p: any) =>
        (p.earningsHistory || []).map((e: any) => ({
            ...e,
            partnerName: getPartnerName(p.id) || 'Unknown Partner',
            partnerId: p.id
        }))
    ).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

    // Stats Logic
    const totalRev = allEarnings.reduce((acc: number, e: any) => acc + (Number(e.dealValue) || 0), 0);
    const pendingComm = allEarnings.filter((e: any) => e.status === 'pending').reduce((acc: number, e: any) => acc + (Number(e.amount) || 0), 0);
    const approvedComm = allEarnings.filter((e: any) => e.status === 'approved').reduce((acc: number, e: any) => acc + (Number(e.amount) || 0), 0);
    const paidComm = allEarnings.filter((e: any) => e.status === 'paid').reduce((acc: number, e: any) => acc + (Number(e.amount) || 0), 0);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.partnerId) { alert('Select a partner'); return; }

        const res = await SupabaseBackend.addEarning({
            partnerId: form.partnerId,
            clientName: form.clientName,
            serviceType: form.serviceType,
            dealValue: parseFloat(form.dealValue),
            commissionPerc: Number(form.commissionPerc),
            date: form.date
        });

        if (!res.success) {
            alert('Failed to log earning: ' + res.error);
            return;
        }

        alert('Earning Created!');
        setIsCreating(false);
        setForm({ partnerId: '', clientName: '', dealValue: '', commissionPerc: 20, serviceType: 'Standard Service', date: new Date().toISOString().split('T')[0] });
        refreshData();
    };

    const handleStatus = async (id: string, status: 'approved' | 'paid', pid: string, amt: number) => {
        if (!confirm(`Change status to ${status.toUpperCase()}? This handles financial logic.`)) return;
        const res = await SupabaseBackend.updateEarningStatus(id, status, pid, amt);
        if (!res.success) {
            alert('Update failed: ' + res.error);
            return;
        }
        if (res.warning) {
            alert('Warning: ' + res.warning);
        }
        refreshData();
    };

    return (
        <div className="space-y-8 animate-fade-in text-white/90">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface border border-white/10 p-4 rounded-xl">
                    <div className="text-xs text-muted uppercase">Total Revenue (Booked)</div>
                    <div className="text-2xl font-bold font-mono">₹{totalRev.toLocaleString()}</div>
                </div>
                <div className="bg-surface border border-white/10 p-4 rounded-xl">
                    <div className="text-xs text-yellow-500 uppercase">Pending Liability</div>
                    <div className="text-2xl font-bold font-mono text-yellow-400">₹{pendingComm.toLocaleString()}</div>
                </div>
                <div className="bg-surface border border-white/10 p-4 rounded-xl">
                    <div className="text-xs text-blue-500 uppercase">Approved (Unpaid)</div>
                    <div className="text-2xl font-bold font-mono text-blue-400">₹{approvedComm.toLocaleString()}</div>
                </div>
                <div className="bg-surface border border-white/10 p-4 rounded-xl">
                    <div className="text-xs text-green-500 uppercase">Total Paid Out</div>
                    <div className="text-2xl font-bold font-mono text-green-400">₹{paidComm.toLocaleString()}</div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-display font-bold">Earnings Manager</h2>
                <button onClick={() => setIsCreating(!isCreating)} className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-white/90 transition-colors">
                    {isCreating ? 'Cancel' : '+ New Earning Entry'}
                </button>
            </div>

            {/* CREATE FORM */}
            <AnimatePresence>
                {isCreating && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <form onSubmit={handleCreate} className="bg-surface border border-white/10 p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="md:col-span-1">
                                <label className="text-xs text-muted uppercase">Growth Partner</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 mt-1"
                                    value={form.partnerId}
                                    onChange={e => setForm({ ...form, partnerId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Partner...</option>
                                    {partners.map((p: any) => (
                                        <option key={p.id} value={p.id}>{getPartnerName(p.id)} ({p.stage})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase">Client / Deal Name</label>
                                <input required className="w-full bg-black/40 border border-white/10 rounded-lg p-3 mt-1" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="e.g. Acme Corp" />
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase">Deal Value (₹)</label>
                                <input required type="number" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 mt-1" value={form.dealValue} onChange={e => setForm({ ...form, dealValue: e.target.value })} placeholder="0.00" />
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase">Commission %</label>
                                <input required type="number" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 mt-1" value={form.commissionPerc} onChange={e => setForm({ ...form, commissionPerc: parseInt(e.target.value) })} placeholder="20" />
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase">Date Closed</label>
                                <input required type="date" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 mt-1" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                            </div>
                            <div className="flex items-end">
                                <button type="submit" className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors">
                                    Log Commission
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TABLE */}
            <div className="bg-surface border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-muted uppercase text-xs">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Partner</th>
                            <th className="p-4">Client / Deal</th>
                            <th className="p-4">Commission</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right w-[160px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {allEarnings.length === 0 ? (
                            <tr><td colSpan={6} className="p-8 text-center text-muted">No earnings records found.</td></tr>
                        ) : (
                            allEarnings.map((e: any) => (
                                <tr key={e.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 text-muted text-xs">{new Date(e.date).toLocaleDateString()}</td>
                                    <td className="p-4 font-bold">{e.partnerName}</td>
                                    <td className="p-4">
                                        <div className="font-bold">{e.clientName}</div>
                                        <div className="text-xs text-muted">Val: ₹{Number(e.dealValue).toLocaleString()}</div>
                                    </td>
                                    <td className="p-4 font-mono font-bold text-green-400">₹{Number(e.amount).toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${e.status === 'paid' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                            e.status === 'approved' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                                                'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                            }`}>
                                            {e.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-3">
                                            {e.status === 'pending' && (
                                                <button onClick={() => handleStatus(e.id, 'approved', e.partnerId, Number(e.amount))} className="text-xs font-bold bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded hover:bg-blue-500 hover:text-white transition-colors">
                                                    Approve
                                                </button>
                                            )}
                                            {e.status === 'approved' && (
                                                <button onClick={() => handleStatus(e.id, 'paid', e.partnerId, Number(e.amount))} className="text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1.5 rounded hover:bg-green-500 hover:text-white transition-colors">
                                                    Mark Paid
                                                </button>
                                            )}
                                            <button className="p-1.5 text-muted hover:text-red-500 hover:bg-white/5 rounded transition-colors" title="Delete Log">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
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

const ApplicationsManager = ({
    applications,
    partners,
    handleReviewApp,
    handleDeleteApp, // New Prop
    setSelectedApplicant // New callback
}: any) => {
    const [filter, setFilter] = useState<'pending' | 'activation' | 'rejected' | 'all'>('pending');

    const pendingApps = applications.filter((a: any) => a.status === 'pending');
    const rejectedApps = applications.filter((a: any) => a.status === 'rejected');

    // Approved but NO partner record (Active) with this application_id 
    // note: partners list already contains active partners
    const activationApps = applications.filter((a: any) =>
        a.status === 'approved' && !partners.find((p: any) => p.applicationId === a.id)
    );

    const getList = () => {
        switch (filter) {
            case 'pending': return pendingApps;
            case 'activation': return activationApps;
            case 'rejected': return rejectedApps;
            default: return applications;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* HEADER & TABS */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-display font-bold">Applications</h2>
                <div className="flex bg-white/5 rounded-lg p-1 gap-1 overflow-x-auto">
                    {['pending', 'activation', 'rejected', 'all'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-bold capitalize transition-all whitespace-nowrap ${filter === f ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}
                        >
                            {f === 'activation' ? 'Onboarding' : f}
                            {(f === 'pending' && pendingApps.length > 0) && <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingApps.length}</span>}
                            {(f === 'activation' && activationApps.length > 0) && <span className="ml-2 bg-yellow-500 text-black text-[10px] px-1.5 py-0.5 rounded-full">{activationApps.length}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block bg-surface border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-muted uppercase text-xs">
                        <tr>
                            <th className="p-4">Applicant</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {getList().length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-muted">No applications found in this category.</td></tr> : getList().map((app: any) => (
                            <tr key={app.id} className="hover:bg-white/5">
                                <td className="p-4">
                                    <div className="font-bold">{app.fullName}</div>
                                    <div className="text-xs text-muted">{app.email}</div>
                                </td>
                                <td className="p-4 text-xs text-muted">
                                    {app.city} • {app.experience ? 'Exp' : 'No Exp'}
                                </td>
                                <td className="p-4 text-xs font-mono text-muted">
                                    {new Date(app.appliedAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                                        app.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                            'bg-yellow-500/20 text-yellow-500'
                                        }`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button onClick={() => setSelectedApplicant(app)} className="p-2 bg-white/5 rounded hover:bg-white/10 text-xs font-bold mr-2">View Profile</button>

                                    {app.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleReviewApp(app.id, 'approved')} className="text-green-400 p-1 hover:bg-green-500/20 rounded"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleReviewApp(app.id, 'rejected')} className="text-red-400 p-1 hover:bg-red-500/20 rounded"><XCircle size={16} /></button>
                                        </>
                                    )}
                                    {(app.status === 'approved') && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    const subject = "Application Approved - Frame n Flow Media GPP";
                                                    const body = `Hello ${app.fullName.split(' ')[0]},\n\nWe are pleased to accept you into the Growth Partner Program.\n\nPlease activate your account by creating your credentials here:\n${window.location.origin}/#/growth-partner/signup\n\n(This link allows you to set your password)\n\nWelcome aboard,\nFrame n Flow Media Team`;
                                                    window.location.href = `mailto:${app.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                                }}
                                                className="text-blue-400 p-1 hover:bg-blue-500/20 rounded"
                                                title="Send Acceptance Email"
                                            >
                                                <Mail size={16} />
                                            </button>
                                            <button onClick={() => handleReviewApp(app.id, 'pending')} className="text-yellow-400 p-1 hover:bg-yellow-500/20 rounded" title="Unapprove (Revert to Pending)"><RotateCcw size={16} /></button>
                                            <button onClick={() => handleDeleteApp(app.id)} className="text-red-400 p-1 hover:bg-red-500/20 rounded" title="Delete Applicant"><Trash2 size={16} /></button>
                                        </>
                                    )}
                                    {app.status === 'rejected' && (
                                        <>
                                            <button onClick={() => handleReviewApp(app.id, 'approved')} className="text-green-400 p-1 hover:bg-green-500/20 rounded" title="Re-Approve"><RotateCcw size={16} /></button>
                                            <button onClick={() => handleDeleteApp(app.id)} className="text-red-400 p-1 hover:bg-red-500/20 rounded" title="Delete Applicant"><Trash2 size={16} /></button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-3">
                {getList().length === 0 ? (
                    <div className="bg-surface border border-white/10 rounded-xl p-8 text-center text-muted">No applications found in this category.</div>
                ) : getList().map((app: any) => (
                    <div key={app.id} className="bg-surface border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="font-bold text-base">{app.fullName}</div>
                                <div className="text-xs text-muted mt-1">{app.email}</div>
                                <div className="text-xs text-muted mt-1">{app.city} • {app.experience ? 'Experienced' : 'No Experience'}</div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs uppercase font-bold whitespace-nowrap ${app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                                app.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                    'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                {app.status}
                            </span>
                        </div>

                        <div className="text-xs text-muted font-mono">
                            Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                            <button onClick={() => setSelectedApplicant(app)} className="flex-1 min-w-[120px] px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-xs font-bold transition-colors">
                                View Profile
                            </button>

                            {app.status === 'pending' && (
                                <>
                                    <button onClick={() => handleReviewApp(app.id, 'approved')} className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 text-xs font-bold transition-colors flex items-center gap-1">
                                        <CheckCircle size={14} /> Approve
                                    </button>
                                    <button onClick={() => handleReviewApp(app.id, 'rejected')} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center gap-1">
                                        <XCircle size={14} /> Reject
                                    </button>
                                </>
                            )}

                            {app.status === 'approved' && (
                                <>
                                    <button
                                        onClick={() => {
                                            const subject = "Application Approved - Frame n Flow Media GPP";
                                            const body = `Hello ${app.fullName.split(' ')[0]},\n\nWe are pleased to accept you into the Growth Partner Program.\n\nPlease activate your account by creating your credentials here:\n${window.location.origin}/#/growth-partner/signup\n\n(This link allows you to set your password)\n\nWelcome aboard,\nFrame n Flow Media Team`;
                                            window.location.href = `mailto:${app.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                        }}
                                        className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 text-xs font-bold transition-colors flex items-center gap-1"
                                    >
                                        <Mail size={14} /> Email
                                    </button>
                                    <button onClick={() => handleReviewApp(app.id, 'pending')} className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 text-xs font-bold transition-colors flex items-center gap-1">
                                        <RotateCcw size={14} /> Revert
                                    </button>
                                    <button onClick={() => handleDeleteApp(app.id)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center gap-1">
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </>
                            )}

                            {app.status === 'rejected' && (
                                <>
                                    <button onClick={() => handleReviewApp(app.id, 'approved')} className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 text-xs font-bold transition-colors flex items-center gap-1">
                                        <RotateCcw size={14} /> Re-Approve
                                    </button>
                                    <button onClick={() => handleDeleteApp(app.id)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center gap-1">
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* DEFAULT MAIL TEMPLATE BOX */}
            <div className="bg-surface border border-white/10 p-4 md:p-6 rounded-xl mt-8">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-sm md:text-base"><Mail size={18} /> Default Acceptance Template</h3>
                <div className="bg-black/30 p-3 md:p-4 rounded-lg font-mono text-[10px] md:text-xs text-muted whitespace-pre-wrap select-all border border-white/5 overflow-x-auto">
                    {`Subject: Application Approved - Frame n Flow Media GPP

Hello [Name],

We are pleased to accept you into the Growth Partner Program.

Please activate your account by creating your credentials here:
${window.location.origin}/#/growth-partner/signup

(This link allows you to set your password)

Welcome aboard,
Frame n Flow Media Team`}
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [applications, setApplications] = useState<GrowthPartnerApplication[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [allLeads, setAllLeads] = useState<any[]>([]);
    const [adminSettings, setAdminSettings] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'apps' | 'leads' | 'payouts' | 'settings'>('overview');

    // UI State
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedPartner, setSelectedPartner] = useState<any | null>(null); // For Partner Modal
    const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null); // For Applicant Modal
    const [broadcastForm, setBroadcastForm] = useState({ title: '', message: '' });
    const [broadcasts, setBroadcasts] = useState<any[]>([]);

    const [earningForm, setEarningForm] = useState({ leadName: '', amount: '', date: new Date().toISOString().split('T')[0] }); // New State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [profileTab, setProfileTab] = useState('overview'); // For GP Profile Modal tabs


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

    const handleReviewApp = async (appId: string, status: 'approved' | 'rejected' | 'pending') => {
        if (!confirm(`Are you sure you want to change status to ${status}?`)) return;
        await SupabaseBackend.reviewApplication(appId, status);
        refreshData();
    };

    const handleDeleteApp = async (appId: string) => {
        if (!confirm('Are you sure you want to PERMANENTLY DELETE this applicant? This cannot be undone.')) return;
        await SupabaseBackend.deleteApplication(appId);
        refreshData();
    };

    const handleAddEarning = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPartner) return;

        await SupabaseBackend.addEarning(
            selectedPartner.id,
            parseFloat(earningForm.amount),
            earningForm.date,
            earningForm.leadName
        );

        alert('Earning added successfully!');
        setEarningForm({ leadName: '', amount: '', date: new Date().toISOString().split('T')[0] });
        refreshData();
        // Close modal or refresh selected partner? 
        // Need to refetch selected partner data to show new list instantly.
        // For now refreshData updates lists, but selectedPartner is stale unless updated.
        // I should re-select partner or just close modal. Re-selecting is hard without refetching logic here.
        // I'll close logic later.
        setSelectedPartner(null);
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

    const handleDeletePartner = async (partnerId: string, partnerName: string) => {
        // Step 1: Confirm deletion
        const confirmDelete = confirm(
            `⚠️ WARNING: You are about to PERMANENTLY DELETE ${partnerName} and ALL their data.\n\n` +
            `This will delete:\n` +
            `• Partner profile and account\n` +
            `• All outreach logs\n` +
            `• All earnings records\n` +
            `• All leads\n` +
            `• Application record\n\n` +
            `This action CANNOT be undone!\n\n` +
            `Do you want to download a backup of their activity first?`
        );

        if (!confirmDelete) return;

        // Step 2: Offer to download backup
        const downloadBackup = confirm('Download activity backup (JSON) before deleting?');

        if (downloadBackup) {
            try {
                const activityData = await SupabaseBackend.getUserActivityData(partnerId);

                if (!activityData) {
                    alert('Failed to fetch user activity data. Deletion cancelled.');
                    return;
                }

                // Generate and download JSON backup
                const dataStr = JSON.stringify(activityData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${partnerName.replace(/\s+/g, '_')}_Activity_Backup_${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                alert('Backup downloaded successfully!');
            } catch (error) {
                console.error('Error downloading backup:', error);
                const continueAnyway = confirm('Failed to download backup. Continue with deletion anyway?');
                if (!continueAnyway) return;
            }
        }

        // Step 3: Final confirmation
        const finalConfirm = confirm(
            `FINAL CONFIRMATION:\n\n` +
            `Are you absolutely sure you want to delete ${partnerName}?\n\n` +
            `This will permanently remove all their data.`
        );

        if (!finalConfirm) return;

        // Step 4: Delete partner
        const result = await SupabaseBackend.deletePartner(partnerId);

        if (result.success) {
            alert(`${partnerName} has been permanently deleted.`);
            setSelectedPartner(null); // Close modal if open
            refreshData();
        } else {
            alert(`Failed to delete partner: ${result.error}`);
        }
    };


    const closePartnerModal = () => {
        setSelectedPartner(null);
        setProfileTab('overview'); // Reset to overview tab when closing
    };

    const getPartnerName = (pid: string) => {
        const p = partners.find(ptr => ptr.id === pid);
        if (!p) return 'Unknown';
        const app = applications.find(a => a.id === p.applicationId);
        return app?.fullName || 'Unknown';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center text-white space-y-4">
                <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse">
                    Frame n Flow Media
                </div>
                <div className="flex items-center gap-2 text-indigo-300 text-sm font-mono tracking-widest uppercase animate-pulse">
                    <Shield size={16} className="animate-spin" />
                    Admin Portal Loading...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 font-sans text-white">
            {/* TOP NAVIGATION BAR - ADMIN SPECIFIC */}
            <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                <div className="max-w-[1920px] mx-auto px-6 py-3.5">
                    <div className="flex items-center justify-between">
                        {/* Logo & Admin Badge */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                    <Shield size={22} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold font-display bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Frame n Flow Media</div>
                                    <div className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                                        Admin Portal
                                    </div>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-indigo-500/20 hidden md:block"></div>
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg backdrop-blur-sm">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                                <span className="text-xs font-semibold text-indigo-200">{user?.name}</span>
                            </div>
                        </div>

                        {/* Navigation Tabs - Horizontal (Desktop) */}
                        <div className="hidden lg:flex items-center gap-1.5">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'overview'
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <BarChart2 size={16} />
                                Command Center
                            </button>
                            <button
                                onClick={() => setActiveTab('partners')}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'partners'
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <Users size={16} />
                                Partners
                            </button>
                            <button
                                onClick={() => setActiveTab('apps')}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'apps'
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <FileText size={16} />
                                Applications
                            </button>
                            <button
                                onClick={() => setActiveTab('leads')}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'leads'
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <Briefcase size={16} />
                                Leads
                            </button>
                            <button
                                onClick={() => setActiveTab('payouts')}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'payouts'
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <DollarSign size={16} />
                                Commissions
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'settings'
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <Settings size={16} />
                                Settings
                            </button>
                        </div>

                        {/* Right Actions (Desktop) */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button className="w-10 h-10 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center text-slate-400 hover:text-indigo-300 transition-all border border-indigo-500/20">
                                <Bell size={18} />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-semibold text-sm flex items-center gap-2 transition-all border border-red-500/30"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-indigo-200 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="lg:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl p-4 overflow-hidden z-50"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg mb-4">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                                        <span className="text-sm font-semibold text-indigo-200">{user?.name} (Admin)</span>
                                    </div>

                                    {[
                                        { id: 'overview', label: 'Command Center', icon: BarChart2 },
                                        { id: 'partners', label: 'Partners', icon: Users },
                                        { id: 'apps', label: 'Applications', icon: FileText },
                                        { id: 'leads', label: 'Leads', icon: Briefcase },
                                        { id: 'payouts', label: 'Commissions', icon: DollarSign },
                                        { id: 'settings', label: 'Settings', icon: Settings }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id as any);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === item.id
                                                ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                                }`}
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </button>
                                    ))}

                                    <div className="h-px bg-white/10 my-2"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            {/* MAIN CONTENT - NO SIDEBAR, FULL WIDTH */}
            <main className="max-w-[1920px] mx-auto px-6 py-8">
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
                    handleDeletePartner={handleDeletePartner}
                />}
                {activeTab === 'apps' && <ApplicationsManager
                    applications={applications}
                    partners={partners}
                    handleReviewApp={handleReviewApp}
                    handleDeleteApp={handleDeleteApp}
                    setSelectedApplicant={setSelectedApplicant}
                />}
                {activeTab === 'leads' && <LeadsTable
                    allLeads={allLeads}
                    getPartnerName={getPartnerName}
                    refreshData={refreshData}
                />}
                {activeTab === 'payouts' && <CommissionsManager
                    partners={partners}
                    getPartnerName={getPartnerName}
                    refreshData={refreshData}
                />}
                {activeTab === 'settings' && <Configuration
                    adminSettings={adminSettings}
                    setAdminSettings={setAdminSettings}
                    handleSaveSettings={handleSaveSettings}
                />}
            </main>

            {/* COMPREHENSIVE GP PROFILE MODAL */}
            <AnimatePresence>
                {selectedPartner && (() => {
                    const partnerApp = applications.find((a: any) => a.id === selectedPartner.applicationId);
                    const partnerLeads = allLeads.filter((l: any) => l.partner_id === selectedPartner.id);

                    return (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm overflow-y-auto"
                            onClick={closePartnerModal}
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                                className="bg-gradient-to-br from-surface to-background border border-white/10 w-full max-w-6xl rounded-2xl overflow-hidden my-4"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* HEADER */}
                                <div className="relative bg-gradient-to-r from-accent/20 via-purple-500/20 to-blue-500/20 p-6 md:p-8 border-b border-white/10">
                                    <button
                                        onClick={closePartnerModal}
                                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                                    >
                                        <XCircle size={28} />
                                    </button>

                                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-3xl font-bold">
                                            {getPartnerName(selectedPartner.id).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">{getPartnerName(selectedPartner.id)}</h2>
                                            <div className="flex flex-wrap gap-3 items-center">
                                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold">{selectedPartner.stage} Partner</span>
                                                <span className="text-sm text-white/60">ID: {selectedPartner.id.slice(0, 8)}</span>
                                                {partnerApp?.email && <span className="text-sm text-white/80">📧 {partnerApp.email}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TABS */}
                                <div className="border-b border-white/10 bg-black/20">
                                    <div className="flex overflow-x-auto">
                                        {['overview', 'activity', 'leads', 'earnings'].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setProfileTab(tab)}
                                                className={`px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap ${profileTab === tab
                                                    ? 'text-accent border-b-2 border-accent bg-accent/5'
                                                    : 'text-muted hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-4 md:p-8 max-h-[60vh] overflow-y-auto">
                                    {/* OVERVIEW TAB */}
                                    {profileTab === 'overview' && (
                                        <div className="space-y-6 animate-fade-in">
                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 p-4 rounded-xl">
                                                    <div className="text-xs text-green-400 uppercase mb-1">Total Earnings</div>
                                                    <div className="text-2xl font-bold font-mono text-green-400">₹{(selectedPartner.earnings?.total || 0).toLocaleString()}</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                                                    <div className="text-xs text-blue-400 uppercase mb-1">Outreach</div>
                                                    <div className="text-2xl font-bold font-mono">{selectedPartner.outreachLogs.reduce((acc: number, l: any) => acc + l.count, 0)}</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 p-4 rounded-xl">
                                                    <div className="text-xs text-purple-400 uppercase mb-1">Leads</div>
                                                    <div className="text-2xl font-bold font-mono">{partnerLeads.length}</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl">
                                                    <div className="text-xs text-yellow-400 uppercase mb-1">Pending</div>
                                                    <div className="text-2xl font-bold font-mono text-yellow-400">₹{(selectedPartner.earnings?.pending || 0).toLocaleString()}</div>
                                                </div>
                                            </div>

                                            {/* Account & Contact Info */}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
                                                    <h3 className="font-bold text-lg flex items-center gap-2"><Users size={20} className="text-accent" /> Account Information</h3>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-muted">Email</span>
                                                            <span className="font-mono">{partnerApp?.email || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-muted">Phone</span>
                                                            <span className="font-mono">{partnerApp?.phone || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-muted">City</span>
                                                            <span>{partnerApp?.city || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2">
                                                            <span className="text-muted">Joined</span>
                                                            <span>{partnerApp?.appliedAt ? new Date(partnerApp.appliedAt).toLocaleDateString() : 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
                                                    <h3 className="font-bold text-lg flex items-center gap-2"><DollarSign size={20} className="text-green-400" /> Banking Details</h3>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-muted">UPI ID</span>
                                                            <span className="font-mono">{selectedPartner.bankDetails?.upiId || 'Not Set'}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-muted">Bank Name</span>
                                                            <span>{selectedPartner.bankDetails?.bankName || 'Not Set'}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-muted">Account Number</span>
                                                            <span className="font-mono">{selectedPartner.bankDetails?.accountNumber ? '****' + selectedPartner.bankDetails.accountNumber.slice(-4) : 'Not Set'}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2">
                                                            <span className="text-muted">IFSC</span>
                                                            <span className="font-mono">{selectedPartner.bankDetails?.ifsc || 'Not Set'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Application Details */}
                                            {partnerApp && (
                                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                                    <h3 className="font-bold text-lg mb-4">Application Details</h3>
                                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-muted block mb-1">Background</span>
                                                            <p className="text-white/90">{partnerApp.background || 'N/A'}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted block mb-1">Reason for Joining</span>
                                                            <p className="text-white/90">{partnerApp.reason || 'N/A'}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted block mb-1">Platforms</span>
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                {partnerApp.platforms?.map((p: string, i: number) => (
                                                                    <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">{p}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted block mb-1">Experience</span>
                                                            <p className="text-white/90">{partnerApp.experience ? 'Yes' : 'No'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ACTIVITY TAB */}
                                    {profileTab === 'activity' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <h3 className="font-bold text-xl">Outreach Activity</h3>
                                            <div className="space-y-3">
                                                {selectedPartner.outreachLogs.length > 0 ? (
                                                    selectedPartner.outreachLogs.map((log: any, i: number) => (
                                                        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <span className="text-sm font-bold">{new Date(log.date).toLocaleDateString()}</span>
                                                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">{log.medium}</span>
                                                                    </div>
                                                                    {log.notes && <p className="text-sm text-muted italic">"{log.notes}"</p>}
                                                                </div>
                                                                <div className="flex gap-6 text-sm">
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold">{log.count}</div>
                                                                        <div className="text-xs text-muted">Sent</div>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-blue-400">{log.replies}</div>
                                                                        <div className="text-xs text-muted">Replies</div>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-green-400">{log.interested}</div>
                                                                        <div className="text-xs text-muted">Interested</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-muted py-12">No activity logs yet</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* LEADS TAB */}
                                    {profileTab === 'leads' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <h3 className="font-bold text-xl">Leads ({partnerLeads.length})</h3>
                                            <div className="space-y-3">
                                                {partnerLeads.length > 0 ? (
                                                    partnerLeads.map((lead: any, i: number) => (
                                                        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-bold text-lg mb-1">{lead.business_name}</h4>
                                                                    <div className="flex flex-wrap gap-2 text-sm text-muted mb-2">
                                                                        {lead.contact_person && <span>👤 {lead.contact_person}</span>}
                                                                        {lead.source_platform && <span>📱 {lead.source_platform}</span>}
                                                                    </div>
                                                                    {lead.notes && <p className="text-sm text-white/70 italic">"{lead.notes}"</p>}
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'Converted' ? 'bg-green-500/20 text-green-400' :
                                                                        lead.status === 'Lost' ? 'bg-red-500/20 text-red-400' :
                                                                            'bg-blue-500/20 text-blue-400'
                                                                        }`}>{lead.status}</span>
                                                                    <span className="text-xs text-muted">{new Date(lead.created_at).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-muted py-12">No leads added yet</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* EARNINGS TAB */}
                                    {profileTab === 'earnings' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-xl">Earnings History</h3>
                                                <div className="text-right">
                                                    <div className="text-sm text-muted">Total Earned</div>
                                                    <div className="text-2xl font-bold text-green-400">₹{(selectedPartner.earnings?.total || 0).toLocaleString()}</div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {selectedPartner.earningsHistory?.length > 0 ? (
                                                    selectedPartner.earningsHistory.map((earning: any, i: number) => (
                                                        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-bold text-lg mb-1">{earning.clientName}</h4>
                                                                    <div className="flex flex-wrap gap-3 text-sm text-muted">
                                                                        <span>🏢 {earning.serviceType}</span>
                                                                        <span>💰 Deal: ₹{Number(earning.dealValue).toLocaleString()}</span>
                                                                        <span>📊 {earning.commissionPerc}% commission</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <div className="text-2xl font-bold text-green-400">₹{Number(earning.amount).toLocaleString()}</div>
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${earning.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                                                                        earning.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                                                                            earning.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                                                'bg-yellow-500/20 text-yellow-400'
                                                                        }`}>{earning.status}</span>
                                                                    <span className="text-xs text-muted">{new Date(earning.date).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-muted py-12">No earnings recorded yet</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* FOOTER ACTIONS */}
                                <div className="border-t border-white/10 p-4 md:p-6 bg-black/20 flex flex-col md:flex-row gap-3">
                                    <button
                                        onClick={() => handleDeletePartner(selectedPartner.id, getPartnerName(selectedPartner.id))}
                                        className="flex-1 bg-red-500/20 text-red-500 py-3 px-6 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Trash2 size={18} /> Delete Partner
                                    </button>
                                    <button className="flex-1 bg-blue-500/20 text-blue-400 py-3 px-6 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all">
                                        Reset Password
                                    </button>
                                    <button
                                        onClick={closePartnerModal}
                                        className="flex-1 bg-white/10 text-white py-3 px-6 rounded-xl font-bold hover:bg-white/20 transition-all">
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
                {selectedApplicant && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedApplicant(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-surface border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold font-display">{selectedApplicant.fullName}</h2>
                                    <p className="text-sm text-accent">{selectedApplicant.status} Applicant</p>
                                </div>
                                <button onClick={() => setSelectedApplicant(null)} className="text-muted hover:text-white"><XCircle size={24} /></button>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-4 rounded-xl">
                                        <h4 className="text-xs text-muted uppercase mb-2">Contact Info</h4>
                                        <div className="text-sm font-bold mb-1">{selectedApplicant.email}</div>
                                        <div className="text-sm text-muted mb-1">{selectedApplicant.phone}</div>
                                        <div className="text-sm text-accent">{selectedApplicant.city}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl">
                                        <h4 className="text-xs text-muted uppercase mb-2">Background</h4>
                                        <div className="text-sm font-bold mb-1">{selectedApplicant.background}</div>
                                        <div className="text-sm text-muted">{selectedApplicant.experience ? 'Prior Experience: Yes' : 'Prior Experience: No'}</div>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-xl">
                                    <h4 className="text-xs text-muted uppercase mb-2">Digital Footprint</h4>
                                    <div className="space-y-2">
                                        {selectedApplicant.linkedin ? (
                                            <a href={selectedApplicant.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                                                <Linkedin size={16} /> {selectedApplicant.linkedin}
                                            </a>
                                        ) : <span className="text-muted italic text-sm">No LinkedIn provided</span>}

                                        {selectedApplicant.social ? (
                                            <a href={selectedApplicant.social} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors">
                                                <Globe size={16} /> {selectedApplicant.social}
                                            </a>
                                        ) : <span className="text-muted italic text-sm">No Social provided</span>}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">Mission Reasoning</h4>
                                    <div className="p-4 bg-white/5 rounded-xl text-sm italic border border-white/5 text-muted">
                                        "{selectedApplicant.reason}"
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-xl">
                                    <h4 className="text-xs text-muted uppercase mb-2">Platforms</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedApplicant.platforms?.map((p: string) => (
                                            <span key={p} className="px-2 py-1 bg-white/10 rounded text-xs">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default AdminDashboard;
