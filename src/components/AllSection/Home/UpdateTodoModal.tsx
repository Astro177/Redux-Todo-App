import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateTodoMutation } from "@/redux/api/api";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

interface TUpdateTodoModalProps {
  id: string;
  initialData: {
    task: string;
    description: string;
    priority: string;
  };
}

export const UpdateTodoModal: React.FC<TUpdateTodoModalProps> = ({
  id,
  initialData,
}) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("");

  const [updateTodo] = useUpdateTodoMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      task: task,
      description: description,
      priority: priority,
    };

    const options = { id: id, data: taskData };

    updateTodo(options);
    toast.success("Task updated successfully");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient">
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Update your task
          </DialogTitle>
          <DialogDescription>
            You can update your task details here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 my-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task Title
              </Label>
              <Input
                id="Task Title"
                type="text"
                placeholder="Your Task Title"
                defaultValue={initialData?.task}
                className="col-span-3"
                onBlur={(e) => {
                  setTask(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Task Description
              </Label>
              <Input
                id="description"
                type="text"
                defaultValue={initialData?.description}
                placeholder="Your Task Description"
                className="col-span-3"
                onBlur={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mt-5">
              <Select onValueChange={(value) => setPriority(value)}>
                <Label htmlFor="description" className="text-right">
                  Set a Priority
                </Label>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Set a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Set a priority</SelectLabel>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit" className="bg-primary-gradient mb-2">
                Update Task
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
