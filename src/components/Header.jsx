import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
import { addProjectToBackend, fetchProjects } from "../redux/store";

const Header = () => {
  const location = useLocation();
  const homePage = location.pathname === "/ProjectsAndTasks/";
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      const projectData = {
        ...newProject,
        id: Date.now().toString(),
        tasks: [], // Initialize with an empty tasks array
      };

      // Dispatch action to add project to backend
      dispatch(addProjectToBackend(projectData)).then(() => {
        dispatch(fetchProjects()); // Refresh project list
      });
      setNewProject({ name: "", description: "" });
      setIsModalOpen(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <header className="bg-navyBlue text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/ProjectsAndTasks/"
          className="text-2xl font-bold hover:opacity-90"
        >
          Projects &amp; Tasks
        </Link>
        {!homePage && (
          <Link
            to="/ProjectsAndTasks/"
            className="px-4 py-2 bg-white text-navyBlue font-semibold rounded-xl hover:bg-gray-200"
          >
            See All Projects
          </Link>
        )}
        {homePage && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-navyBlue font-semibold rounded-xl hover:bg-gray-200"
          >
            Add Project
          </button>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4 text-black">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <input
              type="text"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              placeholder="Project Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded-xl"
            />
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full p-2 mb-4 border border-gray-300 rounded-xl"
            />
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-navyBlue text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;
