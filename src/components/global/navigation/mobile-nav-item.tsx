"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  MobileNavItemProps,
  NavigationLink,
  NavigationSection,
} from "@/data/navigation";

export function MobileNavItem({ item, index, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="border-b border-gray-100 last:border-b-0">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-xl font-medium text-gray-900">
              {item.name}
            </span>
            <ChevronRight
              className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden transition-all duration-500 ease-in-out">
          <div className="px-6 pb-4">
            {item.nested
              ? item.items.map((sectionOrLink, sectionIndex) => {
                  const section = sectionOrLink as NavigationSection;
                  return (
                    <div
                      key={section.title || sectionIndex}
                      className="mb-6 last:mb-0"
                    >
                      <Link
                        href={section.href}
                        className="mb-3 block text-xs font-semibold tracking-wider text-gray-500 uppercase hover:text-blue-600"
                      >
                        {section.title}
                      </Link>
                      <div className="space-y-2">
                        {section.items.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={onClose}
                            className="block h-auto w-full justify-start px-0 py-2 text-left text-gray-700 opacity-70 transition-all duration-500 hover:translate-x-2 hover:text-blue-600 hover:opacity-100"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })
              : item.items.map((link) => {
                  const navLink = link as NavigationLink;
                  return (
                    <Link
                      key={navLink.label}
                      href={navLink.href}
                      onClick={onClose}
                      className="block h-auto w-full justify-start px-0 py-2 text-left text-gray-700 opacity-70 transition-all duration-500 hover:translate-x-2 hover:text-blue-600 hover:opacity-100"
                    >
                      {navLink.label}
                    </Link>
                  );
                })}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
