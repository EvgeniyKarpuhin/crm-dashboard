import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useClientStore } from "../store/useClientStore";

const Tasks = () => {
  const { tasks, addTask, updateStatus } = useTaskStore();
  const { clients } = useClientStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");

  const newTasks = tasks.filter((t) => t.status === "new");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const renderColumn = (title: string, items: typeof tasks) => (
    <div className="flex-1 bg-gray-100 p-4 rounded">
      <h3 className="font-bold mb-3">{title}</h3>

      <div className="flex flex-col gap-2">
        {items.map((task) => {
          const client = clients.find((c) => c.id === task.clientId);
          return (
            <div key={task.id} className="p-3 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <span>{task.title}</span>
                <p className="text-sm text-gray-500">
                  {client?.name || "No client"}
                </p>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value as any)}
                  className="border px-2 py-1"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks Board</h2>

      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Task
      </button>

      <div className="flex gap-4">
        {renderColumn("New", newTasks)}
        {renderColumn("In Progress", inProgressTasks)}
        {renderColumn("Done", doneTasks)}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Create Task</h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full border p-2"
            />

            <select
              value={clientId}
              onChange={(e) => setClientId(e.currentTarget.value)}
              className="w-full border p-2 mb-4 mt-4"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!title.trim() || !clientId) return;
                  addTask(title, clientId);
                  setTitle("");
                  setClientId("");
                  setIsOpen(false);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
