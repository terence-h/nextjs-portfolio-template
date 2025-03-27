import { PropsWithChildren } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDarkMode } from "../contexts/dark-mode-context";

export default function CardSkill({ name, description, iconName, iconFormat }: CardSkillProps) {
    const { isDarkMode } = useDarkMode();
    
    const iconTheme = isDarkMode ? `${iconName}-dark.${iconFormat}` : `${iconName}-light.${iconFormat}`;

    return (
        <motion.div className="flex flex-col items-center w-24 h-auto rounded-lg"
            whileHover={{ scale: 1.1 }}
        >
            <motion.div className="relative flex items-center justify-center">
                <Image
                    priority
                    src={`/images/skills/${iconTheme}`}
                    alt={description}
                    className="object-fill rounded-md w-20 h-20"
                    width={80}
                    height={80}
                />
            </motion.div>
            <div className="text-center mt-2">
                <span className="text-sm">{name}</span>
            </div>
        </motion.div>
    );
}

interface CardSkillProps extends PropsWithChildren {
    name: string;
    description: string;
    iconName: string;
    iconFormat: string;
}