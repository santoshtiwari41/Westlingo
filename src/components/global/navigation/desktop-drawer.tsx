"use client";

import Link from "next/link";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DesktopDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="mt-10 flex h-full flex-col items-start justify-start gap-6 px-10">
          {[
            { title: "About", href: "/about-us" },
            { title: "Blogs", href: "/blogs" },
            { title: "Upcomming Events", href: "/upcomming-events" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              {item.title}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
