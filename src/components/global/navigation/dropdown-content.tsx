import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationItem,
  NavigationLink,
  NavigationSection,
} from "@/data/navigation";

interface DropdownContentProps {
  activeItem: NavigationItem | undefined;
}

export function DropdownContent({ activeItem }: DropdownContentProps) {
  if (!activeItem) return null;

  return (
    <div className="mx-auto h-full max-w-screen-xl px-4 py-12">
      <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-3">
        {activeItem.nested
          ? activeItem.items.map((sectionOrLink, index) => {
              const section = sectionOrLink as NavigationSection;
              return (
                <div key={section.title || index} className="space-y-6">
                  {section.title && (
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      <Link href={section.href} className="hover:text-blue-600">
                        {section.title}
                      </Link>
                    </h3>
                  )}
                  <ul className="space-y-3">
                    {section.items.map((subItem) => (
                      <li key={subItem.label}>
                        <Link href={subItem.href}>
                          <Button
                            variant="ghost"
                            className="group flex h-auto w-full items-center justify-between p-0 text-gray-800 opacity-70 transition-all duration-500 hover:translate-x-1 hover:text-blue-600 hover:opacity-100"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="text-sm font-medium">
                              {subItem.label}
                            </span>
                            <ChevronRight className="h-3 w-3 transform opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          : activeItem.items.map((linkOrSection, index) => {
              const link = linkOrSection as NavigationLink;
              return (
                <div key={link.label} className="space-y-6">
                  <ul className="space-y-3">
                    <li>
                      <Link href={link.href}>
                        <Button
                          variant="ghost"
                          className="group flex h-auto w-full items-center justify-between p-0 text-gray-800 opacity-70 transition-all duration-500 hover:translate-x-1 hover:text-blue-600 hover:opacity-100"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span className="text-sm font-medium">
                            {link.label}
                          </span>
                          <ChevronRight className="h-3 w-3 transform opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
      </div>
    </div>
  );
}
