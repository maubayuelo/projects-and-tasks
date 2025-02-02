// ./components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  if (!project?.id) {
    console.warn("Project missing id:", project); // 🔍 Debugging Log
    return null; // ⛔ Avoid rendering a broken component
  }

  return (
    <div className="bg-white shadow-sm rounded p-4">
      <h2 className="text-xl font-bold">{project.name}</h2>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <Link
        to={`/ProjectsAndTasks/project/${project.id}`}
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        View Project
      </Link>
    </div>
  );
};

export default ProjectCard;
