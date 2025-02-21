import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../redux/supabaseClient"; // ✅ Use Supabase instead of axios
import { deleteProject } from "../redux/store"; // Redux delete action
import TaskColumn from "../components/TaskColumn";
import EditProjectModal from "../components/Modals/EditProjectModal";
import EditTaskModal from "../components/Modals/EditTaskModal";
import NewTaskModal from "../components/Modals/NewTaskModal";

const ProjectDetailsPage = () => {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    status: "Coming",
  });

  const [editProjectData, setEditProjectData] = useState({
    name: "",
    description: "",
  });

  const [editTaskData, setEditTaskData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  // ✅ Fetch project details from Supabase
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("projects")
        .select("*, tasks(*)") // Fetch project with tasks
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching project:", error?.message);
        setError("Project not found");
        setIsLoading(false);
        return;
      }

      setProject(data);
      setEditProjectData({
        name: data.name,
        description: data.description,
      });

      setIsLoading(false);
    };

    fetchProject();
  }, [id]);

  // ✅ Update project in Supabase
  const handleUpdateProject = async () => {
    const { error } = await supabase
      .from("projects")
      .update(editProjectData)
      .eq("id", id);

    if (error) {
      console.error("Error updating project:", error.message);
      return;
    }

    setProject((prev) => ({ ...prev, ...editProjectData }));
    setIsEditProjectModalOpen(false);
  };

  // ✅ Delete project in Supabase & redirect to home
  const handleDeleteProject = async () => {
    // ✅ Step 1: Delete all tasks associated with this project
    const { error: taskError } = await supabase
      .from("tasks")
      .delete()
      .eq("project_id", id);

    if (taskError) {
      console.error("Error deleting tasks:", taskError.message);
      return;
    }

    // ✅ Step 2: Now delete the project
    const { error: projectError } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (projectError) {
      console.error("Error deleting project:", projectError.message);
      return;
    }

    dispatch(deleteProject(id)); // Remove from Redux
    navigate("/ProjectsAndTasks/");
  };

  // ✅ Add a new task to Supabase
  const handleAddTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ ...newTaskData, project_id: id }])
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }

    setProject((prev) => ({
      ...prev,
      tasks: [...prev.tasks, data],
    }));

    setNewTaskData({ title: "", description: "", status: "To Do" });
    setIsNewTaskModalOpen(false);
  };

  // ✅ Edit a task in Supabase
  const handleEditTask = async () => {
    const { error } = await supabase
      .from("tasks")
      .update(editTaskData)
      .eq("id", editTaskData.id);

    if (error) {
      console.error("Error updating task:", error.message); // ✅ Log error
      return;
    }

    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === editTaskData.id ? editTaskData : task
      ),
    }));

    setIsEditTaskModalOpen(false);
  };

  // ✅ Delete a task in Supabase
  const handleDeleteTask = async () => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", editTaskData.id)
      .select(); // Select to confirm the deletion

    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }

    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== editTaskData.id),
    }));

    setIsEditTaskModalOpen(false);
  };

  if (isLoading) return <div>Loading project details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl md:text-3xl font-bold">{project.name}</h1>
          <p className="text-sm md:text-base text-gray-600">
            {project.description}
          </p>
        </div>

        <div className="flex flex-row items-center space-x-6">
          <button
            onClick={() => setIsEditProjectModalOpen(true)}
            className="bg-navyBlue text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Edit Project
          </button>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="bg-navyBlue text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add A New Task
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {["Coming", "To Do", "In Progress", "Done", "Archived"].map(
          (status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={project.tasks.filter((task) => task.status === status)}
              onEditTask={(task) => {
                setEditTaskData(task);
                setIsEditTaskModalOpen(true);
              }}
            />
          )
        )}
      </div>

      {/* Modals */}
      <EditProjectModal
        isOpen={isEditProjectModalOpen}
        onClose={() => setIsEditProjectModalOpen(false)}
        projectData={editProjectData}
        setProjectData={setEditProjectData}
        onSave={handleUpdateProject}
        onDelete={handleDeleteProject}
      />

      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        taskData={editTaskData}
        setTaskData={setEditTaskData}
        onSave={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        taskData={newTaskData}
        setTaskData={setNewTaskData}
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default ProjectDetailsPage;
