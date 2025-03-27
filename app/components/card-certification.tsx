import { PropsWithChildren } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDarkMode } from "../contexts/dark-mode-context";
import Link from "next/link";

export default function CardCertification({ name, url, iconName, iconFormat }: CardCertificationProps) {
    const { isDarkMode } = useDarkMode();

    const iconTheme = isDarkMode ? `${iconName}-dark.${iconFormat}` : `${iconName}-light.${iconFormat}`;

    return (
        <motion.div
            className="flex flex-col items-center w-24 h-auto rounded-lg"
            whileHover={{ scale: 1.1 }}
        >
            <motion.div className="relative flex items-center justify-center">
                <Link href={url} target="_blank" rel="noopener noreferrer">
                    <Image
                        priority
                        src={`/images/certifications/${iconTheme}`}
                        alt={name}
                        className="object-fill rounded-md w-20 h-20"
                        width={80}
                        height={80}
                    />
                </Link>
            </motion.div>
            <div className="text-center mt-2">
                <Link
                    href={url}
                    className="flex items-center flex-wrap gap-2 hover:text-blue-600 dark:hover:text-pink-300 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {name}
                </Link>
            </div>
        </motion.div>
    );

}

interface CardCertificationProps extends PropsWithChildren {
    name: string;
    url: string;
    iconName: string;
    iconFormat: string;
}