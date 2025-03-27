import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';

/**
 * Defines the shape of the MobileContext.
 */
interface MobileContextProps {
    isMobile: boolean;
}

/**
 * Creates the MobileContext with a default value of false.
 */
const MobileContext = createContext<MobileContextProps | undefined>(undefined);

/**
 * Custom hook to access the MobileContext.
 * 
 * @returns The mobile state.
 * @throws Will throw an error if used outside of MobileProvider.
 */
export function useMobileContext(): MobileContextProps {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error('useMobileContext must be used within a MobileProvider');
    }
    return context;
};

/**
 * Provider component that manages and provides mobile state to its children.
 * 
 * @param props - The children components.
 * @returns The provider wrapping its children.
 */
export function MobileProvider({ children }: PropsWithChildren) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        function checkMobile() {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Debounce resize handler for performance (optional)
        let resizeTimer: NodeJS.Timeout;
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                checkMobile();
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
};
