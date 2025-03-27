import { PropsWithChildren, useEffect, useRef } from "react";
import Reveal from "../utils/reveal";
import { useActiveSectionContext } from "../contexts/active-section-context";

export default function Section({ children, id, header = true, className }: SectionProps) {
    const { setSectionRef } = useActiveSectionContext();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            setSectionRef(sectionRef.current);
        }
    }, [setSectionRef]);

    return (
        <Reveal hiddenProps={{ opacity: 0 }} visibleProps={{ opacity: 1 }} duration={0.5} delay={0.2}>
            <section id={id} ref={sectionRef} className={className}>
                {header && <div className="flex basis-full items-center justify-center mt-5 mb-5"><h1 className="text-3xl font-bold text-blue-600 dark:text-pink-300 uppercase">{id}</h1></div>}
                {children}
            </section>
        </Reveal>
    );
}

interface SectionProps extends PropsWithChildren {
    id: string;
    className?: string;
    header?: boolean;
}