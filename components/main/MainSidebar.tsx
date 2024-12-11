import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Project } from "@prisma/client";
import { ArrowUpRight, LineChart, Rocket, Sparkles, Wand2 } from "lucide-react";

import { Separator } from "../ui/separator";
import { UserButton } from "./UserButton";

const MainSidebar = ({
  projects,
  free,
}: {
  projects: Project[];
  free: boolean;
}) => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-start pt-4 md:pt-6">
        <Link
          href="/"
          className="font-sempione font-semibold text-xl p-2 rounded-md w-full flex items-center"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-black">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="text-zinc-800 ">EasyReview</span>
          </div>
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-black">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LineChart />
                    <span>dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-black">
            Your Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!!projects && projects.length > 0 && projects !== undefined ? (
                projects.map((project: Project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/projects/${project.id}`}>
                        <Wand2 className="size-5" />
                        <span>{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span>No projects yet.</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {free ? (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm text-black">
              <Link
                href="/subscriptions"
                className="flex items-center gap-2 hover:bg-black/5 transition-all p-2 rounded-lg w-full"
              >
                <Rocket className="size-4" /> <span>Upgrade to Pro</span>
              </Link>
            </SidebarGroupLabel>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm text-black">
              Payments
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/subscriptions">
                      <ArrowUpRight />
                      <span>subscriptions</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="px-2 py-4">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
