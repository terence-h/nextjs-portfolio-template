import journey from "../data/journey.json";
import { SiListmonk } from "react-icons/si";
import { MdWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import Reveal from "../utils/reveal";
import { useMobileContext } from "../contexts/mobile-context";

export default function Journey() {
    const { isMobile } = useMobileContext();

    return (
        <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="absolute border-blue-600/20 dark:border-pink-300/50 h-full border md:left-1/2 -z-20"></div>
                {journey.map((journey, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <Reveal
                            key={index}
                            hiddenProps={{ opacity: 0, x: (isLeft && !isMobile) ? -50 : 50 }}
                            visibleProps={{ opacity: 1, x: 0 }}
                            duration={0.5}
                            delay={0.15}
                        >
                            <div className={`mb-8 flex justify-between ${isLeft && "md:flex-row-reverse"} items-center w-full`}>
                                {!isMobile && <div className="order-1 w-5/12"></div>}
                                <div className="z-20 flex items-center order-1 bg-blue-600 dark:bg-pink-300 shadow-xl w-8 h-8 rounded-full -ml-[16px] md:ml-0">
                                    <span className="mx-auto font-semibold text-lg">{journey.type === "work" ? <MdWork /> : <IoSchool />}</span>
                                </div>
                                <div className="order-1 border-[1px] border-blue-600 dark:border-pink-300 rounded-lg shadow-xl w-11/12 md:w-5/12 px-6 py-4">
                                    <h1 className="font-bold text-xl text-blue-600 dark:text-pink-300">{journey.heading}</h1>
                                    <h2 className="font-bold text-lg">{journey.subheading}</h2>
                                    <h3 className="font-semibold text-base italic pb-5">{journey.duration}</h3>
                                    {journey.pointers.map((text, index) => (
                                        <div key={index} className="flex items-start space-x-2 mb-2">
                                            <div className="flex-shrink-0">
                                                <SiListmonk size={12} className="mt-[4px] md:mt-[6px]" />
                                            </div>
                                            <p className="text-sm md:text-base">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}