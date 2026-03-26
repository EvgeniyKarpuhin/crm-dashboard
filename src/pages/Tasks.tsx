import { useTaskStore } from "../store/useTaskStore";

const Tasks = () => {
    const { tasks, addTask, updateStatus } = useTaskStore();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>

            <button
                onClick={() => addTask("New Task")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Task
            </button>

            <div className="flex flex-col gap-2">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-3 bg-white rounded shadow flex justify-between"
                    >
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
                ))}
            </div>
        </div>
    );
};

export default Tasks;