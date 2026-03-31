import { api } from "./api";

export const fetchTask = async () => {
    const res = await api.get("/todos?_limit=5");

    return res.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        status: item.completed ? "done" : "new",
        clientId: "1",
    }));
};