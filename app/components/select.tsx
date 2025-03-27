// src/components/CustomSelect.tsx

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Select({ options, value, onChange, placeholder = 'Select an option' }: SelectProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left w-80" ref={containerRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-between w-full rounded-md border border-blue-600 dark:border-pink-300 shadow-sm px-4 py-2 font-medium focus:outline-none"
                    onClick={toggleDropdown}
                >
                    <span>{selectedOption ? selectedOption.label : placeholder}</span>
                    <svg
                        className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-full rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 z-10"
                    >
                        <div className="py-1">
                            {options.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => handleOptionClick(option.value)}
                                    className={`w-full text-left px-4 py-2 bg-background hover:bg-blue-600 hover:text-background hover:dark:bg-pink-300`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};