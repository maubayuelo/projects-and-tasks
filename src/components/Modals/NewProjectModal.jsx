// ./components/Modals/NewProjectModal.jsx
import React from "react";

const NewProjectModal = ({
  isOpen,
  onClose,
  projectData,
  setProjectData,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-3">Add New Project</h2>
        <input
          type="text"
          value={projectData.name}
          onChange={(e) =>
            setProjectData({ ...projectData, name: e.target.value })
          }
          placeholder="Project Name"
          className="w-full px-4 py-2 border rounded-xl mb-4"
        />
        <textarea
          value={projectData.description}
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
          placeholder="Project Description"
          className="w-full px-4 py-2 border rounded-xl mb-4"
        ></textarea>
        <button
          onClick={onAdd}
          className="bg-navyBlue px-4 py-2 text-white mr-2 hover:bg-gray-200"
        >
          Add
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewProjectModal;
