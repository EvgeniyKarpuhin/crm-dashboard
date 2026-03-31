import { create } from "zustand";

export type TaskStatus = "new" | "in-progress" | "done";

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
}

interface TaskStore {
    tasks: Task[];
    addTask: (title: string) => void;
    updateStatus: (id: string, status: TaskStatus) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [
        {id:"1", title: "Create dashboard UI", status: "new"},
        {id:"2", title: "Setup routing", status: "in-progress"},
        {id:"3", title: "Connect API", status: "done"}
    ],

    addTask: (title) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                { id: Date.now().toString(), title, status: "new"},
            ],
        })),

        updateStatus: (id, status) =>
            set((state) => ({
                tasks: state.tasks.map((task) => 
                task.id === id ? {...task, status} : task
            ),
            })),
}));