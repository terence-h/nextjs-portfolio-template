import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { useDarkMode } from "../contexts/dark-mode-context";

export default function IconLink({ href, Icon, className }: IconLinkProps) {
    const { isDarkMode } = useDarkMode();
    const defaultColor: string = isDarkMode ? "#ffffff" : "#000000";
    const colorOnHover: string = isDarkMode ? "#f9a8d4" : "#2563eb";

    return (
        <motion.a href={href}
            whileHover={{
                scale: 1.2,
                color: colorOnHover,
                fill: colorOnHover,
                stroke: colorOnHover
            }}
            style={{ 
                color: defaultColor,  // Set default color based on the current mode
                fill: defaultColor,   // Set default fill color (for SVG)
                stroke: defaultColor  // Set default stroke color (if applicable)
            }}
            target="_blank"
            rel="noopener noreferrer"
        ><Icon className={className} /></motion.a>
    );
}

interface IconLinkProps extends PropsWithChildren {
    href: string;
    Icon: IconType;
    className: string;
}