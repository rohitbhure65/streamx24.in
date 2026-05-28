"use client"

import { Frame, GalleryVerticalEnd, GamepadIcon } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import { NavProjects } from "./NavProjects"
import { NavUser } from "./NavUser"
import { TeamSwitcher } from "./TeamSwitcher"

// This is sample data.
const data = {
  teams: [
    {
      name: "StreamX24",
      logo: GalleryVerticalEnd,
      plan: "Esports Platform",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: GamepadIcon,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
  ],
}

type HomeClientProps = {
  currentUser: Awaited<ReturnType<typeof import("@/src/app/users/queries/getCurrentUser").default>>
}

type AppSidebarProps = HomeClientProps & React.ComponentProps<typeof Sidebar>

export function AppSidebar({ currentUser, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: currentUser?.name ?? "User",
            email: currentUser?.email ?? "user@example.com",
            avatar: "https://github.com/shadcn.png",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
