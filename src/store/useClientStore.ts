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
}),
{
    name: "client-storage",
}
));