// EditTaskModal.jsx
import React, { useState } from "react";

const EditTaskModal = ({
  isOpen,
  onClose,
  taskData,
  setTaskData,
  onSave,
  onDelete,
}) => {
  const [showWarning, setShowWarning] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-3">Edit Task</h2>
        <input
          type="text"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          placeholder="Task Title"
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <textarea
          value={taskData.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
          placeholder="Task Description"
          className="w-full px-4 py-2 border rounded mb-4"
        ></textarea>
        <select
          value={taskData.status}
          onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
          className="w-full px-4 py-2 border rounded mb-4"
        >
          {["Coming", "To Do", "In Progress", "Done", "Archived"].map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>
        <label className="block text-sm font-medium mb-1">Start Date:</label>
        <input
          type="date"
          value={taskData.start_date || ""}
          onChange={(e) =>
            setTaskData({ ...taskData, start_date: e.target.value })
          }
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <label className="block text-sm font-medium mb-1">Dateline:</label>
        <input
          type="date"
          value={taskData.dateline || ""}
          min={taskData.start_date || ""}
          disabled={!taskData.start_date}
          onChange={(e) =>
            setTaskData({ ...taskData, dateline: e.target.value })
          }
          className="w-full px-4 py-2 border rounded mb-4"
        />

        {showWarning ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            <p className="font-semibold">
              Are you sure you want to delete this task?
            </p>
            <p className="text-sm">This action cannot be undone.</p>
            <div className="flex justify-end mt-3 space-x-2">
              <button
                onClick={onDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            <button
              onClick={onSave}
              className="bg-blue-600 px-4 py-2 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowWarning(true)}
              className="bg-red-600 px-4 py-2 text-white rounded"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 text-gray-700 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTaskModal;
