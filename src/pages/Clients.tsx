import { useClientStore } from "../store/useClientStore";

const Clients = () => {
    const { clients } = useClientStore();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Clients</h2>

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
        </div>
    );
};

export default Clients;