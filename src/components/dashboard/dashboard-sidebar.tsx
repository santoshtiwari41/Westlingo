"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookKeyIcon,
  BotIcon,
  CalendarIcon,
  PenSquareIcon,
  PersonStandingIcon,
  StarIcon,
  VideoIcon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import DashboardUserButton from "./dashboard-user-button";

const FIRST_SECTION = [
  { icon: BotIcon, label: "courses", href: "/admin/courses" },
  { icon: PersonStandingIcon, label: "students", href: "/admin/students" },
  { icon: StarIcon, label: "pricing", href: "/admin/pricing" },
  {
    icon: VideoIcon,
    label: "Reservation Slots",
    href: "/admin/reservationSlots",
  },
  { icon: CalendarIcon, label: "Students booking", href: "/admin/booking" },
  { icon: BookKeyIcon, label: "blogs", href: "/admin/blogs" },
  { icon: StarIcon, label: "testimonials", href: "/admin/testimonials" },
  { icon: StarIcon, label: "transactions", href: "/admin/transactions" },
  { icon: PenSquareIcon, label: "writing", href: "/admin/writing" },
];

const DashboardSidebar = () => {
  const pathname = usePathname() || "";

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          TITLE
        </Link>
      </SidebarHeader>

      {/*  */}
      <div className="px-4 py-2">
        <Separator className="text-[#5D6B68] opacity-10" />
      </div>

      {/*  */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {FIRST_SECTION.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% hover:border-[#5D6B68]/10 hover:bg-linear-to-r/oklch",
                      item.label === "writing"
                        ? pathname.startsWith("/admin/writing") &&
                            "border-[#5D6B68]/10 bg-linear-to-r/oklch"
                        : pathname.split("/")[2] === item.label &&
                            "border-[#5D6B68]/10 bg-linear-to-r/oklch"
                    )}
                    isActive={
                      item.label === "writing"
                        ? pathname.startsWith("/admin/writing")
                        : pathname.split("/")[2] === item.label
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight capitalize">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
