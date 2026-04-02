import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Digite uma tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition px-4 py-2 rounded"
      >
        Adicionar
      </button>
    </form>
  );
}