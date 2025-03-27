import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import settings from "../data/settings.json";

/**
 * Defines the shape of the DarkMode context.
 */
interface DarkModeContextProps {
    isDarkMode?: boolean;
    toggleDarkMode: () => void;
}

/**
 * Creates a Context for dark mode with default values.
 */
const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

/**
 * Custom hook to access the DarkModeContext.
 * 
 * @returns The dark mode state and toggle function.
 * @throws Will throw an error if used outside of DarkModeProvider.
 */
export function useDarkMode(): DarkModeContextProps {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

/**
 * Provider component that manages and provides dark mode state to its children.
 * 
 * @param props - The children components.
 * @returns The provider wrapping its children.
 */
export function DarkModeProvider({ children }: PropsWithChildren) {
    // const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    //     // Initialize state from localStorage if available
    //     if (typeof window !== 'undefined') {
    //         const savedTheme = localStorage.getItem('theme');
    //         return savedTheme === 'dark';
    //     }
    //     return false;
    // });
    const [isDarkMode, setDarkMode] = useState<boolean | undefined>(undefined);

    /**
     * Effect to add or remove the 'dark' class from the document body based on isDarkMode.
     */
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    /**
     * Effect to synchronize the dark mode state with localStorage on mount.
     */
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark');
        } else if (savedTheme === 'light') {
            setDarkMode(false);
            document.body.classList.remove('dark');
        } else {
            setDarkMode(settings.darkModeDefault);

            if (settings.darkModeDefault)
                document.body.classList.add('dark');
        }
    }, []);

    /**
     * Toggles the dark mode state and updates localStorage accordingly.
     */
    function toggleDarkMode() {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            if (newMode) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            return newMode;
        });
    };
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {isDarkMode !== undefined && children}
        </DarkModeContext.Provider>
    );
};