// HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";

const HomePage = () => {
  const {
    data: projects,
    loading,
    error,
  } = useSelector((state) => state.projects);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter((project) => project?.id) // ✅ Exclude projects without an id
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
