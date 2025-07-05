"use client";

import Link from "next/link";

import { User2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DesktopDrawer } from "./desktop-drawer";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export default function SiteHeader() {
  return (
    <header className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center gap-2 px-6 sm:px-0 md:gap-4">
        <MainNav />
        <MobileNav />

        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <nav className="flex items-center gap-0.5">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-8 w-8 px-0"
            >
              <Link href="/profile">
                <User2Icon className="h8 w8" />
              </Link>
            </Button>
            <div className="hidden sm:block">
              <DesktopDrawer />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
