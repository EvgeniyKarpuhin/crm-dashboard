import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Client {
    id: string;
    name: string;
    email: string;
    company: string;
}

interface ClientStore {
    clients: Client[];
    addClient: (client: Omit<Client, "id">) => void;
    deleteClient: (id: string) => void;
}

export const useClientStore = create<ClientStore>()(
    persist ((set) => ({
    clients: [],

    addClient: (client) =>
        set((state) => ({
            clients: [
                ...state.clients,
                { id: Date.now().toString(), ...client },
            ],
        })),
    deleteClient: (id) =>
        set((state) => ({
            clients: state.clients.filter((client) => client.id !== id),
        })),
    }),
{
    name: "client-storage",
}
));