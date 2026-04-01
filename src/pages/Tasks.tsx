import { useState, useEffect, useMemo } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useClientStore } from "../store/useClientStore";
import {
  DndContext,
  useDroppable,
  useDraggable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type TaskStatus = "new" | "in-progress" | "done";

type ClientsMap = Record<string, Client>;

type Task = {
  id: string;
  title: string;
  clientId: string;
  status: TaskStatus;
};

type Client = {
  id: string;
  name: string;
};

type TaskCardProps = {
  task: Task;
  client?: Client;
  updateStatus: (taskId: string, status: TaskStatus) => void;
};

function TaskCard({ task, client, updateStatus }: TaskCardProps) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform 
  } = useDraggable({
    id: String(task.id),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        transition: "none",
      }}
      className="p-3 bg-white rounded shadow cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex justify-between items-center gap-3">
        <span>{task.title}</span>

        <p className="text-sm text-gray-500">
          {client?.name || "No client"}
        </p>

        <select
          value={task.status}
          onChange={(e) =>
            updateStatus(task.id, e.target.value as TaskStatus)
          }
          className="border px-2 py-1"
        >
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}

type TaskColumnProps = {
  title: string;
  droppableId: TaskStatus;
  items: Task[];
  clientsMap: ClientsMap;
  updateStatus: (taskId: string, status: TaskStatus) => void;
};

function TaskColumn({
  title,
  droppableId,
  items,
  clientsMap,
  updateStatus,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: droppableId,
  });

  return (
    <div ref={setNodeRef} className="flex-1 bg-gray-100 p-4 rounded">
      <h3 className="font-bold mb-3">{title}</h3>

      <div className="flex flex-col gap-2 min-h-[100px]">
        {items.map((task) => {
          const client = clientsMap[task.clientId];

          return (
            <TaskCard
              key={task.id}
              task={task}
              client={client}
              updateStatus={updateStatus}
            />
          );
        })}
      </div>
    </div>
  );
}

const Tasks = () => {
  const { tasks, addTask, updateStatus } = useTaskStore();
  const { clients } = useClientStore();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [filterClientId] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  const clientsMap = useMemo(() => {
    return Object.fromEntries(
      clients.map((client) => [client.id, client])
    );
  }, [clients]);
  
  const filteredTasks = filterClientId
    ? tasks.filter((t: Task) => t.clientId === filterClientId)
    : tasks;

  const newTasks = filteredTasks.filter((t: Task) => t.status === "new");
  const inProgressTasks = filteredTasks.filter(
    (t: Task) => t.status === "in-progress"
  );
  const doneTasks = filteredTasks.filter((t: Task) => t.status === "done");

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id) as TaskStatus;

    updateStatus(taskId, newStatus);
  };

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

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          <TaskColumn
            title="New"
            droppableId="new"
            items={newTasks}
            clientsMap={clientsMap}
            updateStatus={updateStatus}
          />

          <TaskColumn
            title="In Progress"
            droppableId="in-progress"
            items={inProgressTasks}
            clientsMap={clientsMap}
            updateStatus={updateStatus}
          />

          <TaskColumn
            title="Done"
            droppableId="done"
            items={doneTasks}
            clientsMap={clientsMap}
            updateStatus={updateStatus}
          />
        </div>
      </DndContext>

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
              {clients.map((client: Client) => (
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
