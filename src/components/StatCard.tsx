type Props = {
    title: string;
    value: number;
    onClick?: () => void;
    active?: boolean;
};

const StatCard = ({ title, value, onClick, active } : Props) => {
    return (
        <div 
            className={`p-4 rounded shadow cursor-pointer transition ${active ? "bg-blue-100" : "bg-white hover:bg-gray-100"}`}
            onClick={onClick}
        >
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
        </div>
    );
};

export default StatCard;