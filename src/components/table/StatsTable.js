const StatsTable = ({ stats }) => (
    <div className="mt-4">
        <p><strong>Stats:</strong></p>
        <table className="stats-table w-full border-collapse">
            <thead>
                <tr>
                    <th className="border p-2 bg-gray-200">HP</th>
                    <th className="border p-2 bg-gray-200">Attack</th>
                    <th className="border p-2 bg-gray-200">Defense</th>
                    <th className="border p-2 bg-gray-200">Special Attack</th>
                    <th className="border p-2 bg-gray-200">Special Defense</th>
                    <th className="border p-2 bg-gray-200">Speed</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border p-2">{stats.hp}</td>
                    <td className="border p-2">{stats.attack}</td>
                    <td className="border p-2">{stats.defense}</td>
                    <td className="border p-2">{stats.special_attack}</td>
                    <td className="border p-2">{stats.special_defense}</td>
                    <td className="border p-2">{stats.speed}</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default StatsTable;
