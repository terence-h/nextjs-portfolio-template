"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { MouseEventHandler, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import navBarItems from "../data/navbar-items.json";
import IconLink from "./icon-link";
import { useLenis } from 'lenis/react';
import { useDarkMode } from "../contexts/dark-mode-context";
import { useMobileContext } from "../contexts/mobile-context";
import { useActiveSectionContext } from "../contexts/active-section-context";
import general from "../data/general.json";
import settings from "../data/settings.json";

export default function NavBar() {
    const lenis = useLenis();
    const { isMobile } = useMobileContext();
    const { activeSection } = useActiveSectionContext();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 200], [0, 1]);

    return (
        <>
            {isMobile ?
                // MOBILE
                <motion.nav className="block fixed inset-x-0 bottom-0 z-[49]"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <div className="flex justify-between">
                        <button onClick={() => setIsOpen(!isOpen)} className="relative mx-auto w-14 h-14 mb-5 bg-stone-300 dark:bg-stone-700/80 rounded-full shadow-lg">
                            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                                <span className={`block absolute h-0.5 w-8 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-4' : 'top-2'}`}></span>
                                <span className={`block absolute h-0.5 w-8 bg-current transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'} top-4`}></span>
                                <span className={`block absolute h-0.5 w-8 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 top-4' : 'top-6'}`}></span>
                            </div>
                        </button>
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                // Lower or increase -top-xx if you make changes to the number of items in the navbar
                                className="absolute left-1/2 transform -translate-x-1/2 -top-72 w-1/2 p-4 shadow-lg rounded-lg backdrop-blur-md bg-stone-300/80 dark:bg-stone-700/80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ul className="space-y-2">
                                    {navBarItems.map((item) => {
                                        if (!settings.sections[item.path.slice(1) as keyof typeof settings.sections])
                                            return null;

                                        const isActive = item.path == `#${activeSection}`;
                                        const defaultColor: string = isDarkMode ? "#ffffff" : "#000000";
                                        const colorOnHoverOrActive: string = isDarkMode ? "#f9a8d4" : "#2563eb";

                                        return (
                                            <li key={item.path}>
                                                <motion.div className="w-full cursor-pointer justify-center inline-block text-center pt-2 pb-1 duration-300 hover:text-blue-600 dark:hover:text-pink-300"
                                                    onClick={() => { lenis?.scrollTo(item.path); }}
                                                    whileHover={!isActive ? { scale: 1.1, color: colorOnHoverOrActive } : {}}
                                                    style={isActive ? { scale: 1.1, color: colorOnHoverOrActive } : { color: defaultColor }}
                                                >
                                                    <span className="tab tab-home block text-sm">{item.name}</span>
                                                </motion.div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <hr className="mt-2 mb-3" />
                                <div className="flex gap-5 justify-center">
                                    <IconLink href={general.github} Icon={FaGithub} className="inline-block w-8 h-8" />
                                    <IconLink href={general.linkedin} Icon={FaLinkedin} className="inline-block w-8 h-8" />
                                    <IconLink href={"mailto:" + general.email} Icon={MdEmail} className="inline-block w-8 h-8" />
                                    <DarkModeButton onClick={toggleDarkMode} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.nav>
                :
                // DESKTOP
                // dark:bg-black/10
                // <motion.nav className="fixed top-0 left-0 right-0 mx-auto pt-3 pb-3 backdrop-blur-md z-[49]"
                //     initial={{ opacity: 0 }}
                //     animate={{ opacity: 1 }}
                //     exit={{ opacity: 0 }}
                //     transition={{ duration: 1 }}
                // >
                <motion.nav
                    style={{ opacity }}
                    className="fixed top-0 left-0 right-0 mx-auto pt-3 pb-3 backdrop-blur-md z-[49]"
                >
                    <nav className="grid grid-flow-row grid-cols-12 w-5/6 mx-auto">
                        <div className="col-span-2 mr-auto flex items-center text-sm"></div>
                        <div className="col-span-12 md:col-span-8 ml-auto mr-auto rounded-lg sticky top-0">
                            <div className="relative w-full rounded-lg">
                                {navBarItems.map((item) => {
                                    if (!settings.sections[item.path.slice(1) as keyof typeof settings.sections])
                                        return null;

                                    const isActive = item.path == `#${activeSection}`;
                                    const defaultColor: string = isDarkMode ? "#ffffff" : "#000000";
                                    const colorOnHoverOrActive: string = isDarkMode ? "#f9a8d4" : "#2563eb";

                                    return (
                                        <motion.button
                                            key={item.path}
                                            className={`mx-1 px-4 py-3 rounded-md text-base relative no-underline duration-300 ease-in`}
                                            data-active={isActive}
                                            onClick={() => { lenis?.scrollTo(item.path); }}
                                            whileHover={!isActive ? { scale: 1.1, color: colorOnHoverOrActive, transition: { duration: 0.1 } } : {}}
                                            style={isActive ? { scale: 1.1, color: colorOnHoverOrActive } : { color: defaultColor }}
                                        >
                                            <span>{item.name}</span>
                                            {isActive && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 w-full h-full bg-stone-300 dark:bg-stone-700/80 rounded-md -z-10"
                                                    layoutId="navbar"
                                                    aria-hidden="true"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.5,
                                                        stiffness: 130,
                                                        damping: 15,
                                                        duration: 0.3,
                                                    }}
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center ml-auto gap-5 text-sm">
                            <IconLink href={general.github} Icon={FaGithub} className="inline-block w-8 h-8" />
                            <IconLink href={general.linkedin} Icon={FaLinkedin} className="inline-block w-8 h-8" />
                            <IconLink href={"mailto:" + general.email} Icon={MdEmail} className="inline-block w-8 h-8" />
                            <DarkModeButton onClick={toggleDarkMode} />
                        </div>
                    </nav>
                </motion.nav>
            }
        </>
    );
}

function DarkModeButton({ onClick }: DarkModeButtonProps) {
    const { isDarkMode } = useDarkMode();

    return (
        <button onClick={onClick}
            className="h-8 w-8 rounded-lg"
        >
            {!isDarkMode && (
                <motion.svg
                    className="fill-violet-700"
                    key="moon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </motion.svg>
            )}
            {isDarkMode && (
                <motion.svg
                    className="fill-yellow-500"
                    key="sun"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
                >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                </motion.svg>
            )}
        </button>
    );
}

interface DarkModeButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}