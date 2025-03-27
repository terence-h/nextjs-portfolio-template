import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: {
        y: "2vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
    },
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const lenis = useLenis();

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            // Pause Lenis scrolling
            lenis?.stop();
        } else {
            // Resume Lenis scrolling
            lenis?.start();
        }

        // Clean up on unmount or when isOpen changes
        return () => {
            lenis?.start();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Create a portal element if it doesn't exist
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="max-w-[90%] lg:max-w-[60%] bg-background bg-opacity-100 rounded-lg shadow-lg p-6 relative border-[1px] border-blue-600 dark:border-pink-300 min-w-80"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <button
                            className="absolute top-2 right-3 hover:text-blue-600 dark:hover:text-pink-300 text-2xl leading-none transition duration-300"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        modalRoot
    );
};