import React, { createContext, useContext, useState } from 'react';

interface TitleContextType {
    title: string;
    breadcrumb: string[];
    titlePath: string;
    setTitle: (title: string) => void;
    setBreadCrumb: (breadcrumb: string[]) => void;
    setTitlePath: (path: string) => void;
}



const TitleContext = createContext<TitleContextType | undefined>(undefined);

export const TitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState('');
    const [breadcrumb, setBreadCrumb] = useState<string[]>([]);
    const [titlePath, setTitlePath] = useState('');

    return (
        <TitleContext.Provider value={{ title, breadcrumb, titlePath, setTitle, setBreadCrumb, setTitlePath }}>
            {children}
        </TitleContext.Provider>
    );
};

export const useTitle = () => {
    const context = useContext(TitleContext);
    if (!context) {
        throw new Error('useTitle must be used within a TitleProvider');
    }
    return context;
}; 