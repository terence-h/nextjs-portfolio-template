"use client";

import Image from "next/image";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {motion} from 'framer-motion';
import IconLink from "./icon-link";
import {LuDownload} from "react-icons/lu";
import general from "../data/general.json";

export default function About() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 flex flex-col flex-md-fill gap-5 items-center justify-center md:order-1">
                <motion.div className="text-4xl md:text-6xl font-bold glitch" data-text={general.name}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            exit={{opacity: 0}}>
                    {general.name}
                </motion.div>
                <motion.p className="text-xl md:text-3xl font-semibold text-center"
                          initial={{opacity: 0, x: 50}}
                          animate={{opacity: 1, x: 0}}
                          transition={{duration: 1}}
                          exit={{opacity: 0}}
                >
                    {general.role}
                </motion.p>
                <motion.p
                    className="text-sm md:text-base text-justify md:w-2/3 leading-relaxed text-gray-500 dark:text-gray-400"
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1}}
                    exit={{opacity: 0}}
                >
                    {general.introduction}
                </motion.p>
                <motion.div className="flex gap-10"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            exit={{opacity: 0}}
                >
                    <IconLink href={general.github} Icon={FaGithub}
                              className="inline-block w-12 h-12"/>
                    <IconLink href={general.linkedin} Icon={FaLinkedin}
                              className="inline-block w-12 h-12"/>
                    <IconLink href={"mailto:" + general.email} Icon={MdEmail} className="inline-block w-12 h-12"/>

                </motion.div>
                <motion.div className="flex gap-10">
                    <motion.a
                        className="bg-transparent font-semibold py-2 px-4 border-[1px] border-blue-600 dark:border-pink-300 hover:bg-blue-600 hover:text-background dark:hover:bg-pink-300 rounded"
                        href={general.resumeUrl} download
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1}}
                        exit={{opacity: 0}}
                        whileHover={{
                            scale: 1.1,
                            transition: {duration: 0.1},
                        }}
                    >
                        Download CV <LuDownload className="inline-block w-7 h-7 pb-1"/>
                    </motion.a>
                </motion.div>
            </div>
            <motion.div
                className="relative flex items-center justify-center mx-auto w-2/3 md:w-full md:order-2 md:col-span-1"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                exit={{opacity: 0}}
            >
                <Image priority src={general.profilePicture.url} alt="Profile Picture" className="w-full h-auto mt-5 md:mt-0 mb-2"
                       width={general.profilePicture.width} height={1}/>
                <div
                    className="absolute inset-0 pointer-events-none
                    bg-gradient-to-b from-transparent to-white/40
                    dark:bg-gradient-to-b dark:from-transparent dark:to-black/30">
                </div>

            </motion.div>
        </div>
    );
}