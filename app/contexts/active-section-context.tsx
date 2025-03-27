import { createContext, useContext, useEffect, useRef, useState, PropsWithChildren } from 'react';

interface ActiveSectionContextProps {
    activeSection: string | null;
    setSectionRef: (element: HTMLElement) => void;
    removeSectionRef: (element: HTMLElement) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextProps | undefined>(undefined);

export function useActiveSectionContext(): ActiveSectionContextProps {
    const context = useContext(ActiveSectionContext);
    if (!context) {
        throw new Error('useActiveSectionContext must be used within an ActiveSectionProvider');
    }
    return context;
};

export function ActiveSectionProvider({ children }: PropsWithChildren) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sectionRefs = useRef<Set<HTMLElement>>(new Set());

    const observer = useRef<IntersectionObserver | null>(null);

    function setSectionRef(element: HTMLElement) {
        sectionRefs.current.add(element);
        if (observer.current) {
            observer.current.observe(element);
        }
    };

    function removeSectionRef(element: HTMLElement) {
        sectionRefs.current.delete(element);
        if (observer.current) {
            observer.current.unobserve(element);
        }
    };

    useEffect(() => {
        function observerCallback(entries: IntersectionObserverEntry[]) {
            entries.forEach((entry) => {
                const id = entry.target.id;
                if (entry.isIntersecting) {
                    setActiveSection(id);
                } else {
                    const sections = Array.from(sectionRefs.current);
                    const index = sections.findIndex((section) => section.id === id);
                    if (
                        index > 0 &&
                        entry.boundingClientRect.top > 0 &&
                        window.scrollY > 350
                    ) {
                        setActiveSection(sections[index - 1].id);
                    }
                }
            });
        };

        observer.current = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '0px',
            threshold: window.innerWidth < 768 ? 0.2 : 0.4,
        });

        // Observe existing sections
        sectionRefs.current.forEach((section) => {
            observer.current?.observe(section);
        });

        // Handle window resize to update thresholds
        function handleResize() {
            if (observer.current) {
                observer.current.disconnect();
                observer.current = new IntersectionObserver(observerCallback, {
                    root: null,
                    rootMargin: '0px',
                    threshold: window.innerWidth < 768 ? 0.2 : 0.4,
                });

                sectionRefs.current.forEach((section) => {
                    observer.current?.observe(section);
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setSectionRef, removeSectionRef }}>
            {children}
        </ActiveSectionContext.Provider>
    );
};