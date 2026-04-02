import { useTasks } from "../features/tasks/useTasks";
import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useState } from "react";

export function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask, editTask, filter, setFilter } = useTasks();
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 Tarefas</h1>

      <div className="bg-gray-800 p-6 rounded shadow space-y-4">
        <TaskForm
          onAdd={(title) => {
            addTask(title);
            showToast("✅ Tarefa criada!");
          }}
        />

        {/* 🔥 FILTROS */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded ${
              filter === "pending" ? "bg-yellow-500" : "bg-gray-700"
            }`}
          >
            Pendentes
          </button>

          <button
            onClick={() => setFilter("done")}
            className={`px-3 py-1 rounded ${
              filter === "done" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            Concluídas
          </button>
        </div>

        {/* 🔢 CONTADOR */}
        <p className="text-gray-400 text-sm">
          {tasks.length} tarefas
        </p>

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={(id) => {
            deleteTask(id);
            showToast("🗑 Tarefa removida!");
          }}
          onEdit={(id, title) => {
            editTask(id, title);
            showToast("✏️ Tarefa atualizada!");
          }}
        />
      </div>

      {/* 🔥 TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}