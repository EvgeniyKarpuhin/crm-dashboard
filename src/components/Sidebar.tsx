import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-6">CRM</h2>

            <nav className="flex flex-col gap-3">
                <Link to="/">Dashboard</Link>
                <Link to="/clients">Clients</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
        </div>
    );
};

export default Sidebar