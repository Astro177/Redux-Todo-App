import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";
import { AddTodo } from "./AddTodo";
import { SortTodo } from "./SortTodo";
import { TodoList } from "./TodoList";

type TTodoProps = {
  _id: string;
  task: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

export const TodoContainer = () => {
  const [priority, setPriority] = useState("");
  const { data: todos, isLoading } = useGetTodosQuery(priority);

  if (isLoading) {
    <p>Loading.....</p>;
  }

  return (
    <div>
      <div className="flex justify-between mt-10">
        <AddTodo />
        <SortTodo priority={priority} setPriority={setPriority} />
      </div>
      <div className="rounded-xl p-5 bg-primary-gradient h-auto my-10 w-auto lg:w-[1200px]">
        <div className="h-auto rounded-xl space-y-3">
          {todos?.length > 0 ? (
            todos?.map((todo: TTodoProps) => (
              <TodoList key={todo?._id} todo={todo} />
            ))
          ) : (
            <div className="bg-white text-2xl font-bold p-5 text center rounded-xl flex justify-center">
              <p>There is no task for you!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
