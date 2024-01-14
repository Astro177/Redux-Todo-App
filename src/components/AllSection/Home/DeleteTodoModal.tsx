import { Button } from "@/components/ui/button";
import { useDeleteTodoMutation } from "@/redux/api/api";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteTodoModalProps {
  id: string;
}

export const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({ id }) => {
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDelete = () => {
    deleteTodo(id);
    toast.success("Task Delete Successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-gradient hover:bg-red-400">
          <FaTrashAlt />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <div>
          <p className="text-center p-10 font-bold text-2xl">
            Are You Sure You Want To Delete This Task?
          </p>
        </div>
        <div className="flex justify-center mb-5 gap-6 items-center">
          <DialogClose asChild>
            <Button className="bg-green-gradient mb-2">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-red-gradient mb-2"
              onClick={handleDelete}
            >
              Delete Task
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
