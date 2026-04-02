import { useTaskStore } from "../store/useTaskStore";
import { useClientStore } from "../store/useClientStore";
import StatCard from "../components/StatCard";

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
               <StatCard title="Total Task" value={total} />
               <StatCard title="New" value={newCount} />
               <StatCard title="In Progress" value={inProgress} />
               <StatCard title="Done" value={done} />
            </div>

            <div className="bg-white p-4 rounded shadow">
                <p className="mb-2 font-medium">Completion</p>
                <div className="w-full bg-gray-200 rounded h-3">
                    <div 
                        className="bg-green-500 h-3 rounded"
                        style={{ width: `${completionRate}%` }}
                    >
                    </div>
                    <p className="mt-2 text-sm">{completionRate}% completed</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <p className="font-medium mb-3">Recent Task</p>
                    <div className="space-y-2">
                        {tasks.slice(-5).reverse().map((task) => {
                            const client = clients.find(c => c.id === task.clientId);

                            return (
                                <div
                                    key={task.id}
                                    className="flex justify-between text-sm border-b pb-1"
                                >
                                    <span>{task.title}</span>
                                    <span className="text-gray-500">
                                        {client?.name || "No client"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;