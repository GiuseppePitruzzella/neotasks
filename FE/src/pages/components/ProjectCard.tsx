import React from "react";

interface Project {
    id: number;
    name: string;
    description: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="bg-[#F1F1F0] w-full p-6">
            <h1 className="text-base font-semibold leading-7 tracking-tight text-black">{project.name.toUpperCase()}</h1>
            <p className="text-sm font-sm leading-6 text-gray-400">{project.description}</p>
        </div>
    );
};

export default ProjectCard;