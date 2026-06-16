const tournaments = [
  { id: 1, name: "IPL 2026", format: "T20", teams: 10, status: "Active" },
  { id: 2, name: "World Cup", format: "ODI", teams: 10, status: "Upcoming" },
  { id: 3, name: "Champions Trophy", format: "ODI", teams: 8, status: "Completed" },
];

const Tournaments = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tournaments</h1>
        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          + Create Tournament
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Format</th>
              <th className="p-3 text-left">Teams</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.format}</td>
                <td className="p-3">{item.teams}</td>
                <td className="p-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tournaments;