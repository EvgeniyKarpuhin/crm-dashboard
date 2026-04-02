import { useTaskStore } from "../store/useTaskStore";
import { useClientStore } from "../store/useClientStore";

const Dashboard = () => {
    const { tasks } = useTaskStore();
    const { clients } = useClientStore();

    const total = tasks.length;
    const newCount = tasks.filter((t) => t.status === "new").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;

    const completionRate = total
        ? Math.round((done / total) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>

            <div className="grid grid-cols-4 gap-4">
               
            </div>
        </div>
    )
};

export default Dashboard;