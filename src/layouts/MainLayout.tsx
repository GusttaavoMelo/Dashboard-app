import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-200 dark:bg-gray-800 p-5">
        <h2 className="text-xl font-bold mb-6">📊 Dashboard</h2>

        <button
          onClick={() => setDark(!dark)}
          className="mb-6 bg-blue-500 hover:bg-blue-600 active:scale-95 transition px-3 py-2 rounded"
        >
          Alternar tema 🌗
        </button>

        <nav className="flex flex-col gap-3">
          <Link to="/" className="hover:text-blue-400 transition">
            🏠 Home
          </Link>
          <Link to="/tasks" className="hover:text-blue-400 transition">
            📋 Tarefas
          </Link>
          <Link to="/profile" className="hover:text-blue-400 transition">
            👤 Perfil
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-semibold">
            Bem-vindo 👋
          </h3>
        </header>

        {/* MAIN (SCROLL AQUI) */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}