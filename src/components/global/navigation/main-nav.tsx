"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowDownIcon, PlaneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/data/navigation";

import { DropdownContent } from "./dropdown-content";

export const MainNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
    setIsDropdownVisible(true);
  };

  const handleContainerMouseLeave = () => {
    setActiveDropdown(null);
    setIsDropdownVisible(false);
  };

  const activeItem = navigationItems.find(
    (item) => item.name === activeDropdown
  );

  return (
    <div className="hidden w-full items-center md:flex">
      <Link href="/" className="flex items-center gap-2 lg:mr-6">
        <PlaneIcon className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">Westlingo</span>
      </Link>

      {/* Main container that handles all mouse events */}
      <div className="relative w-full" onMouseLeave={handleContainerMouseLeave}>
        <nav className="flex w-full items-center justify-center gap-4 text-sm xl:gap-6">
          {navigationItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
            >
              <Button
                variant="ghost"
                className={`h-auto p-0 text-base font-normal opacity-80 transition-all duration-400 hover:bg-transparent hover:opacity-100 ${
                  activeDropdown === item.name
                    ? "text-gray-600"
                    : "text-gray-800 hover:text-gray-600"
                }`}
                onClick={handleContainerMouseLeave}
              >
                {item.name} <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </nav>

        {isDropdownVisible && (
          <div className="absolute top-full right-0 left-0 h-2 bg-transparent" />
        )}

        <div
          className={`absolute top-full left-0 z-50 w-screen origin-top transform border-b border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out ${
            isDropdownVisible && activeDropdown
              ? "translate-y-0 scale-y-100 opacity-100"
              : "pointer-events-none -translate-y-4 scale-y-0 opacity-0"
          }`}
          style={{
            height: "40vh",
            marginLeft: "calc(-50vw + 50%)",
          }}
        >
          <DropdownContent activeItem={activeItem} />
        </div>

        {isDropdownVisible && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            style={{ top: "calc(100% + 40vh)" }}
          />
        )}
      </div>
    </div>
  );
};
