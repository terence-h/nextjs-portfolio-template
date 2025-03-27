import certifications from "../data/certifications.json";
import Reveal from "../utils/reveal";
import CardCertification from "./card-certification";

export default function Certifications() {
    return (
        <>
            {Object.entries(certifications).map(([key, certification], index) => {
                return (
                    <Reveal
                        key={index}
                        hiddenProps={{ opacity: 0, y: 50 }}
                        visibleProps={{ opacity: 1, y: 0 }}
                        duration={0.5}
                        delay={0.15}
                    >
                        <div className="pb-12">
                            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-8">
                                <CardCertification
                                    key={key}
                                    name={certification.name}
                                    url={certification.url}
                                    iconName={certification.iconName}
                                    iconFormat={certification.iconFormat}
                                />
                            </div>
                        </div>
                    </Reveal>
                );
            })}
        </>
    );
}