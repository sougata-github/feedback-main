import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewProjectForm from "./NewProjectForm";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const NewProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-md sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription className="text-base font-normal">
            Create a new project to get started.
          </DialogDescription>
        </DialogHeader>
        <NewProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
