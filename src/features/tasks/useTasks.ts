import { useEffect, useState } from "react";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  // carregar do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tasks");
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas", error);
    }
  }, []);

    function editTask(id: number, newTitle: string) {
  if (!newTitle.trim()) return;

  setTasks((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    )
  );
}
  // salvar no localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title: string) {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  // 🔥 FILTRO CORRETO (agora no lugar certo)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  return {
  tasks: filteredTasks,
  addTask,
  toggleTask,
  deleteTask,
  editTask, // 👈 NOVO
  filter,
  setFilter,
};
}