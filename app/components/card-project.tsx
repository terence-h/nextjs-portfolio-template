import Image from "next/image";
import {PropsWithChildren, useState} from "react";
import Modal from "./modal";
import Link from "next/link";
import {GoArrowRight} from "react-icons/go";

interface CardProjectProps extends PropsWithChildren {
    title: string;
    shortDesc: string;
    url: string;
    repo: string;
    image: string;
    imgWidth: number,
    imgHeight: number;
}

export default function CardProject({
                                        title,
                                        shortDesc,
                                        url,
                                        repo,
                                        image,
                                        imgWidth,
                                        imgHeight,
                                        children
                                    }: CardProjectProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasUrl = url.length > 0;
    const hasRepo = repo.length > 0;

    return (
        <>
            <div className="shadow-lg rounded-lg overflow-hidden border-[1px] border-blue-600 dark:border-pink-300">
                <Image className="w-full object-cover object-center cursor-pointer" src={`/images/projects/${image}`}
                       width={imgWidth}
                       height={imgHeight} alt="Project" onClick={() => setIsModalOpen(true)}/>
                    <div className="p-6">
                        <h1 className="text-xl font-semibold text-blue-600 dark:text-pink-300 mb-3">{title}</h1>
                        <p className="leading-relaxed min-h-12 md:min-h-20 mb-3">{shortDesc}</p>
                        <button
                            className="flex items-center flex-wrap hover:text-blue-600 dark:hover:text-pink-300 transition duration-300"
                            onClick={() => setIsModalOpen(true)}>
                            <span className="inline-flex items-center">Learn More</span>
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                 fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-pink-300">{title}</h2>
                <p className="mb-6 whitespace-pre-wrap text-justify">{children}</p>
                {(hasUrl || hasRepo) && (
                    <div className="flex flex-col flex-wrap mb-6 gap-3">
                        {hasUrl && (
                            <Link href={url}
                                  className={`flex items-center flex-wrap gap-2 hover:text-blue-600 dark:hover:text-pink-300 transition duration-300`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                Project Demo
                                <GoArrowRight/>
                            </Link>
                        )}
                        {hasRepo && (
                            <Link href={repo}
                                  className={`flex items-center flex-wrap gap-2 hover:text-blue-600 dark:hover:text-pink-300 transition duration-300`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                Repository
                                <GoArrowRight/>
                            </Link>
                        )}
                    </div>
                )}
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-transparent font-semibold py-2 px-4 border-[1px] border-blue-600 dark:border-pink-300 hover:bg-blue-600 hover:text-background dark:hover:bg-pink-300 rounded transition duration-300"
                >
                    Close
                </button>
            </Modal>
        </>
);
}