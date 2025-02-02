// ./components/TaskCard.jsx
import React from "react";

const TaskCard = ({ task, onEditTask }) => (
  <div className="bg-white rounded-lg shadow-sm p-2 border border-gray-200">
    <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
    <p className="text-xs text-gray-500 mt-1">{task.description}</p>
    <p className="text-xs text-gray-500 mt-1">Dateline: {task.dateline}</p>
    <button
      onClick={() => onEditTask(task)}
      className="text-blue-500 text-xs hover:underline mt-2"
    >
      Edit Task
    </button>
  </div>
);

export default TaskCard;
