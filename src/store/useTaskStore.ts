import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskStatus = "new" | "in-progress" | "done";

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    clientId: string;
}

interface TaskStore {
    tasks: Task[];
    
    addTask: (title: string, clientId: string) => void;
    updateStatus: (id: string, status: TaskStatus) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist((set) => ({
    tasks: [],

    addTask: (title: string, clientId: string) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                { id: Date.now().toString(), title, status: "new", clientId},
            ],
        })),

        updateStatus: (id: string, status: TaskStatus) =>
            set((state: any) => ({
                tasks: state.tasks.map((task: any) => 
                task.id === id ? {...task, status} : task
            ),
            })),
}),
{
    name: "task-storage",
}
));