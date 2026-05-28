"use client"

import {
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  TrophyIcon,
  UserCircleIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import { NavPublic } from "./NavPublic"
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
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        { title: "Wallet Balance", url: "/dashboard/wallet-balance" },
        { title: "Active Tournaments", url: "/dashboard/active-tournaments" },
        { title: "Recent Matches", url: "/dashboard/recent-matches" },
        { title: "Refer & Earn Stats", url: "/dashboard/refer-earn-stats" },
      ],
    },
    {
      title: "Tournaments",
      url: "/tournaments",
      icon: TrophyIcon,
      items: [
        { title: "Browse Tournaments", url: "/tournaments/browse" },
        { title: "My Registrations", url: "/tournaments/my-registrations" },
        { title: "Live Tournaments", url: "/tournaments/live" },
        { title: "Completed Tournaments", url: "/tournaments/completed" },
      ],
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: WalletIcon,
      items: [
        { title: "Balance", url: "/wallet/balance" },
        { title: "Add Money", url: "/wallet/add-money" },
        { title: "Withdraw", url: "/wallet/withdraw" },
        { title: "Transaction History", url: "/wallet/transactions" },
      ],
    },
    {
      title: "Refer & Earn",
      url: "/refer",
      icon: UsersIcon,
      items: [
        { title: "My Referral Code", url: "/refer/code" },
        { title: "Referred Users", url: "/refer/users" },
        { title: "Referral Earnings", url: "/refer/earnings" },
      ],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserCircleIcon,
      items: [
        { title: "Game IDs", url: "/profile/game-ids" },
        { title: "KYC Verification", url: "/profile/kyc" },
        { title: "Settings", url: "/profile/settings" },
      ],
    },
  ],
  navPublic: [
    {
      title: "Community",
      url: "/community",
      icon: UsersIcon,
      items: [
        { title: "Leaderboard", url: "/community/leaderboard" },
        { title: "Looking for Team ", url: "/community/lft" },
        { title: "Looking for Players", url: "/community/lfp" },
        { title: "My Team", url: "/community/my-team" },
        { title: "Team Members", url: "/community/my-team/members" },
        { title: "Team Stats", url: "/community/my-team/stats" },
        { title: "Team Tournaments", url: "/community/my-team/tournaments" },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "PUBG",
  //     url: "/tournaments/browse/pubg",
  //     icon: Crosshair,
  //   },
  //   {
  //     name: "BGMI",
  //     url: "/tournaments/browse/bgmi",
  //     icon: Target,
  //   },
  //   {
  //     name: "Free Fire",
  //     url: "/tournaments/browse/free-fire",
  //     icon: Flame,
  //   },
  //   {
  //     name: "Valorant",
  //     url: "/tournaments/browse/valorant",
  //     icon: Sword,
  //   },
  //   {
  //     name: "COD",
  //     url: "/tournaments/browse/cod",
  //     icon: Shield,
  //   },
  //   {
  //     name: "CS2",
  //     url: "/tournaments/browse/cs2",
  //     icon: Bomb,
  //   },
  //   {
  //     name: "Fortnite",
  //     url: "/tournaments/browse/fortnite",
  //     icon: Zap,
  //   },
  //   {
  //     name: "Dota 2",
  //     url: "/tournaments/browse/dota2",
  //     icon: Swords,
  //   },
  // ],
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
        <NavPublic items={data.navPublic} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: currentUser?.name ?? "User",
            email: currentUser?.email ?? "user@example.com",
            avatar:
              "https://imgs.search.brave.com/gXSAI7GgrT1-vrz9vJ6VKVGEKT-okd3zB6SlLyo5Tho/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2l0eXBuZy5jb20v/cHVibGljL3VwbG9h/ZHMvcHJldmlldy93/aGl0ZS11c2VyLW1l/bWJlci1ndWVzdC1p/Y29uLXBuZy1pbWFn/ZS03MDE3NTE2OTUw/MzcwMDV6ZHVyZmFp/bTB5LnBuZz92PTIw/MjYwMzI1MjA",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
