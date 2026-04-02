import { AnimatePresence } from "framer-motion";
import { TaskItem } from "./TaskItem";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type Props = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export function TaskList({ tasks, onToggle, onDelete, onEdit }: Props) {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit} // 👈 AGORA CORRETO
          />
        ))}
      </AnimatePresence>

      {tasks.length === 0 && (
        <p className="text-gray-400 text-center mt-4">
          Nenhuma tarefa ainda 👀
        </p>
      )}
    </div>
  );
}