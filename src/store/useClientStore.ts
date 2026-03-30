import { create } from "zustand";

export interface Client {
    id: string;
    name: string;
    email: string;
    company: string;
}

interface ClintStore {
    clients: Client[];
    addClient: (client: Omit<Client, "id">) => void;
}

export const useClientStore = create<ClintStore>((set) => ({
    clients: [
        {
            id: "1",
            name: "John Doe",
            email: "jonh@example.com",
            company: "Google",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            company: "Amazon",
        },
    ],

    addClient: (client) =>
        set((state) => ({
            clients: [
                ...state.clients,
                { id: Date.now().toString(), ...client },
            ],
        })),
}));