import React, { useState } from "react";

const EditProjectModal = ({
  isOpen,
  onClose,
  projectData,
  setProjectData,
  onSave,
  onDelete,
}) => {
  const [showWarning, setShowWarning] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-3">Edit Project</h2>
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

        {showWarning ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            <p className="font-semibold">
              Are you sure you want to delete this project?
            </p>
            <p className="text-sm">This action cannot be undone.</p>
            <div className="flex justify-end mt-3 space-x-2">
              <button
                onClick={onDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-900"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onSave}
              className="bg-navyBlue px-4 py-2 text-white rounded-xl"
            >
              Save
            </button>
            <button
              onClick={() => setShowWarning(true)}
              className="bg-red-600 px-4 py-2 text-white rounded-xl"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 text-gray-700 rounded-xl"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProjectModal;
