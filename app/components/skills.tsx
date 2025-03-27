import skills from "../data/skills.json";
import CardSkill from "./card-skill";
import Reveal from "../utils/reveal";

export default function Skills() {
    return (
        <>
            {Object.entries(skills).map(([category, items], index) => {
                const isPositive = index % 2 === 0;

                return (
                    <Reveal
                        key={category}
                        hiddenProps={{ opacity: 0, x: isPositive ? 50 : -50 }}
                        visibleProps={{ opacity: 1, x: 0 }}
                        duration={0.5}
                        delay={0.15}
                    >
                        <div className="pb-12">
                            <h2 className="text-xl font-semibold pb-2">{category}</h2>
                            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-8">
                                {items.map((item) => (
                                    <CardSkill
                                        key={item.name}
                                        name={item.name}
                                        description={item.description}
                                        iconName={item.iconName}
                                        iconFormat={item.iconFormat}
                                    />
                                ))}
                            </div>
                        </div>
                    </Reveal>
                );
            })}
        </>
    );
}