import React from "react";

const NewTaskModal = ({ isOpen, onClose, taskData, setTaskData, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-3">Add New Task</h2>
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
        <div className="flex justify-end space-x-2">
          <button
            onClick={onAdd}
            className="bg-blue-600 px-4 py-2 text-white rounded"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 text-gray-700 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
