import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ tasks, onEditTask, dateline, status }) => {
  // Sort tasks by dateline (ascending order)
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.dateline);
    const dateB = new Date(b.dateline);
    return dateA - dateB; // Closest dateline first
  });

  return (
    <div className="bg-gray-100 rounded-lg px-2 pt-2 pb-3">
      <h2 className="text-lg font-bold text-navyBlue mb-2">{status}</h2>
      <div className="space-y-2">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">
            No tasks in this column.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
