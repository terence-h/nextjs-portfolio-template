import { motion, useAnimation, useInView } from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function Reveal({ children, hiddenProps, visibleProps, duration, delay }: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    const mainControls = useAnimation();

    useEffect(() => {
        mainControls.start(isInView ? "visible" : "hidden");
    }, [isInView, mainControls]);

    return (
        <motion.div ref={ref}
            variants={{
                hidden: hiddenProps,
                visible: visibleProps
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: duration, delay: delay }}
        >
            {children}
        </motion.div>
    );
}

interface RevealProps extends PropsWithChildren {
    hiddenProps: { opacity?: number, x?: number, y?: number }
    visibleProps: { opacity?: number, x?: number, y?: number }
    duration: number;
    delay: number
}