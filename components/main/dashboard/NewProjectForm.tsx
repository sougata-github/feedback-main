"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newProjectSchema } from "@/schemas";
import { Textarea } from "../../ui/textarea";
import { Dispatch, SetStateAction, useTransition } from "react";
import { createProject } from "@/actions/project";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NewProjectForm = ({ setIsOpen }: Props) => {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof newProjectSchema>) => {
    startTransition(() => {
      createProject(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }

          if (data?.project) {
            form.reset();
            setIsOpen(false);
            toast.success("Project created");
            router.push(`/projects/${data.project.id}`);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                Project Name
              </FormLabel>
              <FormControl>
                <Input placeholder="My Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                Project Url
              </FormLabel>
              <FormControl>
                <Input placeholder="https://my-project.io" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                Project Description (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="We are a catering business..."
                  className="min-h-28 sm:min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? (
            <Loader className="size-5 text-white animate-spin transition-all" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
