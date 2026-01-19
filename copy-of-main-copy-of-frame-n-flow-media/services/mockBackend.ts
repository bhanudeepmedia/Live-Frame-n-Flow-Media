// Simple UUID generator replacement
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Types
export interface GrowthPartnerApplication {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    background: string;
    experience: boolean;
    reason: string;
    platforms: string[];
    status: 'pending' | 'approved' | 'rejected';
    appliedAt: string;
}

export interface User {
    id: string;
    username: string;
    password?: string; // In real app, this is hashed
    role: 'admin' | 'partner';
    name: string;
    email?: string;
    partnerId?: string; // Link to partner data if role is partner
}

export interface OutreachLog {
    id: string;
    date: string;
    medium: string;
    count: number;
    replies: number;
    interested: number;
    notes?: string;
}

export interface EarningLog {
    id: string;
    amount: number;
    date: string;
    clientName: string;
    serviceType: string;
    dealValue: number;
    status: 'pending' | 'approved' | 'paid' | 'rejected';
}

export interface PartnerData {
    id: string; // matches User.partnerId
    applicationId: string;
    stage: 'Starter' | 'Connector' | 'Builder' | 'Closer' | 'Elite Partner';
    outreachLogs: OutreachLog[];
    earningsHistory?: EarningLog[]; // New Field
    earnings: {
        total: number;
        paid: number;
        pending: number;
    };
    bankDetails?: {
        accountHolder: string;
        bankName: string;
        accountNumber: string;
        ifsc: string;
    };
}

// Storage Keys
const KEYS = {
    USERS: 'fnf_users',
    APPLICATIONS: 'fnf_applications',
    PARTNERS: 'fnf_partners',
    CURRENT_USER: 'fnf_current_user' // Session simulation
};

// Initial Data
const INITIAL_ADMIN: User = {
    id: 'admin-1',
    username: 'admin',
    password: 'password123', // Demo password
    role: 'admin',
    name: 'Bhanu Deep'
};

// Helper to get from storage
const getStore = <T>(key: string, defaultVal: T): T => {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultVal;
    try {
        return JSON.parse(stored);
    } catch {
        return defaultVal;
    }
};

const setStore = (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
};

// --- Service Methods ---

export const MockBackend = {
    // --- Auth ---
    login: async (username: string, password: string): Promise<{ user: User | null; error?: string }> => {
        // delay for realism
        await new Promise(r => setTimeout(r, 500));

        // Check admin hardcoded first if not in DB
        const users = getStore<User[]>(KEYS.USERS, [INITIAL_ADMIN]);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            const { password, ...safeUser } = user;
            localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(safeUser));
            return { user: safeUser as User };
        }
        return { user: null, error: 'Invalid credentials' };
    },

    logout: () => {
        localStorage.removeItem(KEYS.CURRENT_USER);
    },

    getCurrentUser: (): User | null => {
        return getStore<User | null>(KEYS.CURRENT_USER, null);
    },

    // --- Public: Apply ---
    submitApplication: async (data: Omit<GrowthPartnerApplication, 'id' | 'status' | 'appliedAt'>) => {
        await new Promise(r => setTimeout(r, 800));
        const apps = getStore<GrowthPartnerApplication[]>(KEYS.APPLICATIONS, []);
        const newApp: GrowthPartnerApplication = {
            ...data,
            id: uuidv4(),
            status: 'pending',
            appliedAt: new Date().toISOString()
        };
        apps.push(newApp);
        setStore(KEYS.APPLICATIONS, apps);
        return newApp;
    },

    // --- Admin ---
    getApplications: async () => {
        // Ensure admin check in real app
        return getStore<GrowthPartnerApplication[]>(KEYS.APPLICATIONS, []);
    },

    reviewApplication: async (appId: string, status: 'approved' | 'rejected') => {
        const apps = getStore<GrowthPartnerApplication[]>(KEYS.APPLICATIONS, []);
        const appIndex = apps.findIndex(a => a.id === appId);
        if (appIndex === -1) throw new Error('Application not found');

        apps[appIndex].status = status;
        setStore(KEYS.APPLICATIONS, apps);

        // If approved, create user account
        if (status === 'approved') {
            const app = apps[appIndex];
            const users = getStore<User[]>(KEYS.USERS, [INITIAL_ADMIN]);

            // Auto-generate credentials
            const username = app.email.split('@')[0] + Math.floor(Math.random() * 100);
            const tempPassword = 'welcome-partner';

            const newPartnerId = uuidv4();

            const newUser: User = {
                id: uuidv4(),
                username,
                password: tempPassword,
                role: 'partner',
                name: app.fullName,
                email: app.email,
                partnerId: newPartnerId
            };

            users.push(newUser);
            setStore(KEYS.USERS, users);

            // Initialize Partner Data
            const partners = getStore<PartnerData[]>(KEYS.PARTNERS, []);
            const newPartner: PartnerData = {
                id: newPartnerId,
                applicationId: app.id,
                stage: 'Starter',
                outreachLogs: [],
                earnings: { total: 0, paid: 0, pending: 0 }
            };
            partners.push(newPartner);
            setStore(KEYS.PARTNERS, partners);

            return { success: true, credentials: { username, password: tempPassword } };
        }

        return { success: true };
    },

    getAllPartners: async () => {
        return getStore<PartnerData[]>(KEYS.PARTNERS, []);
    },

    // --- Partner ---
    getPartnerData: async (partnerId: string) => {
        const partners = getStore<PartnerData[]>(KEYS.PARTNERS, []);
        return partners.find(p => p.id === partnerId) || null;
    },

    logOutreach: async (partnerId: string, log: Omit<OutreachLog, 'id'>) => {
        const partners = getStore<PartnerData[]>(KEYS.PARTNERS, []);
        const index = partners.findIndex(p => p.id === partnerId);
        if (index === -1) throw new Error('Partner not found');

        const newLog = { ...log, id: uuidv4() };
        partners[index].outreachLogs.unshift(newLog); // Newest first

        // Update stage based on simple logic (mock gamification)
        const totalOutreach = partners[index].outreachLogs.reduce((acc, l) => acc + l.count, 0);
        if (totalOutreach > 500) partners[index].stage = 'Elite Partner';
        else if (totalOutreach > 200) partners[index].stage = 'Closer';
        else if (totalOutreach > 100) partners[index].stage = 'Builder';
        else if (totalOutreach > 50) partners[index].stage = 'Connector';

        setStore(KEYS.PARTNERS, partners);
        return newLog;
    }
};
