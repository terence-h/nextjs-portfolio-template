import CardProject from './card-project';
import projectsData from "../data/projects.json";
import { useState } from 'react';
import Select from './select';
import options from '../data/project_types.json';

export default function Projects() {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const projects = projectsData.filter((project) => selectedValue === "" || project.type === selectedValue);

    return (
        <>
            <div className='flex basis-full justify-center md:pl-5 md:pt-5'>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={setSelectedValue}
                />
            </div>
            <div className="flex flex-wrap w-full">
                {projects.length > 0 ?
                    projects
                        .map((project, index) => (
                            <div key={index} className='basis-full md:basis-1/2 lg:basis-1/3 p-5'>
                                <CardProject title={project.title} shortDesc={project.shortDesc} url={project.url} repo={project.repo} image={project.img} imgWidth={project.imgWidth} imgHeight={project.imgHeight}>{project.longDesc}</CardProject>
                            </div>
                        ))
                    : <p>No projects found.</p>}
            </div>
        </>
    );
}