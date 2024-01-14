import { useUpdateTodoMutation } from "@/redux/api/api";
import { DeleteTodoModal } from "./DeleteTodoModal";
import { UpdateTodoModal } from "./UpdateTodoModal";
import toast from "react-hot-toast";

type TTodoProps = {
  _id: string;
  task: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

interface TodoListProps {
  todo: TTodoProps;
}

export const TodoList: React.FC<TodoListProps> = ({ todo }) => {
  const { task, description, _id, isCompleted, priority } = todo || undefined;

  const [updateTodo] = useUpdateTodoMutation();

  const toggleComplete = () => {
    const taskData = {
      task: task,
      description: description,
      isCompleted: !isCompleted,
      priority: priority,
    };

    const options = { id: _id, data: taskData };

    updateTodo(options);
    toast.success(`Your Task is ${isCompleted ? "Pending!" : "Completed!"}`);
  };

  return (
    <div className="bg-white rounded-2xl p-1">
      <div className="rounded-xl flex justify-between items-center p-5 border-2 border-blue-600/60">
        <input
          onChange={toggleComplete}
          type="checkbox"
          className="size-4 mr-10"
          defaultChecked={isCompleted}
        />
        <p className={`flex-1 font-bold pr-5 ${isCompleted && "line-through"}`}>
          {task}
        </p>
        <div className="flex-1">
          {isCompleted ? (
            <p className="text-green-500 font-bold">Completed</p>
          ) : (
            <p className="text-red-500 font-bold">Pending</p>
          )}
        </div>
        <div className="flex-1 font-bold">
          {priority === "High" && (
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-red-500"></div>
              <div>{priority}</div>
            </div>
          )}
          {priority === "Medium" && (
            <div className="flex items-center gap-2 b">
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <div>{priority}</div>
            </div>
          )}
          {priority === "Low" && (
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-teal-500"></div>
              <div>{priority}</div>
            </div>
          )}
        </div>
        <p className="flex-[2] px-4">{description}</p>
        <div className="flex gap-4">
          <UpdateTodoModal
            id={_id}
            initialData={{ task, description, priority }}
          />
          <DeleteTodoModal id={_id} />
        </div>
      </div>
    </div>
  );
};
