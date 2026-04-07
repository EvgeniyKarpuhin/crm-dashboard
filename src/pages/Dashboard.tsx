import { useTaskStore } from "../store/useTaskStore";
import { useClientStore } from "../store/useClientStore";
import StatCard from "../components/StatCard";
import { useState } from "react";

const Dashboard = () => {
    const { tasks } = useTaskStore();
    const { clients } = useClientStore();

    const total = tasks.length;
    const newCount = tasks.filter((t) => t.status === "new").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const [filterStatus, setFilterStatus] = useState<"all" | "new" | "in-progress" | "done">("all");
    const filteredTasks = filterStatus === "all" 
        ? tasks 
        : tasks.filter((t) => t.status === filterStatus);

    const completionRate = total
        ? Math.round((done / total) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>

            <div className="grid grid-cols-4 gap-4">
               <StatCard 
                title="Total Task" 
                value={total} 
                onClick={() => setFilterStatus("all")}
                active={filterStatus === "all"}
            />
               <StatCard 
                title="New" 
                value={newCount} 
                onClick={() => setFilterStatus("new")}
                active={filterStatus === "new"}
            />
               <StatCard 
                title="In Progress" 
                value={inProgress} 
                onClick={() => setFilterStatus("in-progress")}
                active={filterStatus === "in-progress"}
            />
               <StatCard 
                title="Done" 
                value={done} 
                onClick={() => setFilterStatus("done")}
                active={filterStatus === "done"}
            />
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

                <div className="bg-white p-4 rounded mt-8">
                    <p className="font-medium mb-3">Recent Task</p>
                    <div className="space-y-2">
                        {[...filteredTasks].slice(-20).reverse().map((task) => {
                            const client = clients.find(c => c.id === task.clientId);

                            return (
                                <div
                                    key={task.id}
                                    className="flex justify-between text-sm border-b pb-1"
                                >
                                    <span>{task.title}</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-gray-500">
                                        {client?.name || "No client"}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${
                                            task.status === "new" ? "bg-blue-100 text-blue-800" :
                                            task.status === "in-progress" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {task.status}
                                    </span>
                                    </div>
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