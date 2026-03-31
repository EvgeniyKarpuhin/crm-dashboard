import { useState } from "react";
import { useClientStore } from "../store/useClientStore";

const Clients = () => {
    const { clients, addClient } = useClientStore();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const[company, setCompany] = useState("");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Clients</h2>

            <button
                onClick={() => setIsOpen(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Client
            </button>

            <div className="grid grid-cols-3 gap-4">
                { clients.map((client) => (
                    <div
                        key={client.id}
                        className="p-4 bg-white rounded shadow"
                    >
                        <h3 className="font-bold">{client.name}</h3>
                        <p className="text-sm text-gray-500">{client.email}</p>
                        <p className="text-sm">{client.company}</p>
                    </div>
                ))}
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded w-80"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold mb-4">Create Client</h3>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full border p-2 mb-2" 
                        />

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full border p-2 mb-2" 
                        />

                        <input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company"
                            className="w-full border p-2 mb-4" 
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-1 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    if (!name || !email || !company) return;

                                    addClient({name, email, company});

                                    setName("");
                                    setEmail("");
                                    setCompany("");
                                    setIsOpen(false);
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;