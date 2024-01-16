import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddTodosMutation } from "@/redux/api/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export const AddTodo = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("");

  const [addTodo] = useAddTodosMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const taskData = {
      task: task,
      description: description,
      isCompleted: false,
      priority: priority,
    };
    addTodo(taskData);
    toast.success("Task Added Successfully!");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add a new task
          </DialogTitle>
          <DialogDescription>
            You can add your new task details here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 my-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Task Title</Label>
              <Input
                id="Task Title"
                type="text"
                placeholder="Your Task Title"
                className="col-span-3"
                onBlur={(e) => {
                  setTask(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Task Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Your Task Description"
                className="col-span-3"
                onBlur={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mt-5">
              <Select onValueChange={(value) => setPriority(value)}>
                <Label className="text-right">Set a Priority</Label>
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
          <div className="flex justify-end gap-6">
            <DialogClose asChild>
              <Button className="bg-red-gradient mb-2">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="bg-primary-gradient mb-2">
                Add Task
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
