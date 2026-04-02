import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    setTimeout(() => {
      if (saved) setTasks(JSON.parse(saved));
      setLoading(false);
    }, 500);
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const pending = total - completed;

  const data = [
    { name: "Concluídas", value: completed },
    { name: "Pendentes", value: pending },
  ];

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Carregando dados...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-5 rounded shadow">
          <h2 className="text-gray-400">Total de tarefas</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-gray-800 p-5 rounded shadow">
          <h2 className="text-gray-400">Concluídas</h2>
          <p className="text-2xl font-bold text-green-400">
            {completed}
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded shadow">
          <h2 className="text-gray-400">Pendentes</h2>
          <p className="text-2xl font-bold text-yellow-400">
            {pending}
          </p>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="bg-gray-800 p-5 rounded flex justify-center">
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value">
            <Cell fill="#22c55e" />
            <Cell fill="#facc15" />
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}