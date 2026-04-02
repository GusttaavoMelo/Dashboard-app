import { motion } from "framer-motion";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleEdit() {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center justify-between bg-gray-700 p-3 rounded"
    >
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5"
        />

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-gray-600 text-white px-2 py-1 rounded w-full"
          />
        ) : (
          <span
            className={`flex-1 ${
              task.done ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 ml-3">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="text-green-400 hover:text-green-600"
          >
            💾
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-600"
          >
            ✏️
          </button>
        )}

        <button
          onClick={() => {
            if (confirm("Tem certeza que deseja excluir?")) {
              onDelete(task.id);
            }
          }}
          className="text-red-400 hover:text-red-600"
        >
          🗑
        </button>
      </div>
    </motion.div>
  );
}