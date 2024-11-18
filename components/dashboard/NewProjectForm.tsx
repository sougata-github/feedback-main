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
import { newProjectSchema } from "@/schemas/newProjectSchema";
import { Textarea } from "../ui/textarea";

const NewProjectForm = () => {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newProjectSchema>) => {
    console.log(values);
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
                Project Description
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
