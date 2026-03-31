import { create } from "zustand";
import { fetchTask } from "../services/taskService";

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
    fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [
        {id:"1", title: "Create dashboard UI", status: "new", clientId: "1"},
        {id:"2", title: "Setup routing", status: "in-progress", clientId: "2"},
        {id:"3", title: "Connect API", status: "done", clientId: "3"}
    ],

    fetchTasks: async () => {
        const data = await fetchTask();
        set({ tasks: data});
    },

    addTask: (title, clientId) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                { id: Date.now().toString(), title, status: "new", clientId},
            ],
        })),

        updateStatus: (id, status) =>
            set((state) => ({
                tasks: state.tasks.map((task) => 
                task.id === id ? {...task, status} : task
            ),
            })),
}));