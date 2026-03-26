import { useTaskStore } from "../store/useTaskStore";
// import { TaskStatus } from "../store/useTaskStore";

const Tasks = () => {
    const { tasks, addTask, updateStatus } = useTaskStore();

    const newTasks = tasks.filter((t) => t.status === "new");
    const inProgressTask = tasks.filter((t) => t.status === "in-progress");
    const doneTasks = tasks.filter((t) => t.status === "done");

    const renderColumn = (title: string, items: typeof tasks) => (
        <div className="flex-1 bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-3">{title}</h3>


            <div className="flex flex-col gap-2">
                {items.map((task) => (
                    <div
                        key={task.id}
                        className="p-3 bg-white rounded shadow"
                    >
                        <div className="flex justify-between items-center">
                            <span>{task.title}</span>
                            <select
                                value={task.status}
                                onChange={(e) =>
                                    updateStatus(task.id, e.target.value as any)
                                }
                                className="border px-2 py-1"
                            >
                                <option value="new">New</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Tasks Board</h2>

            <button
                onClick={() => addTask("New Task")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Task
            </button>

            <div className="flex gap-4">
                {renderColumn("New", newTasks)}
                {renderColumn("In Progress", inProgressTask)}
                {renderColumn("Done", doneTasks)}
            </div>
        </div>
    );
};

export default Tasks;