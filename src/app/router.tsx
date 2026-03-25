import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Tasks from "../pages/Tasks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "clients",
                element: <Clients />,
            },
            {
                path: "tasks",
                element: <Tasks />,
            },
        ],
    },
]);