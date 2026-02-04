import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WhatsAppContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(prev => !prev);

    return (
        <WhatsAppContext.Provider value={{ isOpen, open, close, toggle }}>
            {children}
        </WhatsAppContext.Provider>
    );
};

export const useWhatsApp = () => {
    const context = useContext(WhatsAppContext);
    if (context === undefined) {
        throw new Error('useWhatsApp must be used within a WhatsAppProvider');
    }
    return context;
};
