"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { AnimatePresence, type Variants, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: NavItemWithChildren[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Courses", href: "/courses" },
    { title: "About", href: "/about" },
  ],
  sidebarNav: [
    {
      title: "Course Services",
      items: [
        {
          title: "PTE",
          items: [
            {
              title: "Preparation Class",
              href: "/course/pte/preparations",
              items: [],
            },
            { title: "Test Booking", href: "/course/pte/bookings", items: [] },
            { title: "Mock Test", href: "/course/pte/mocks", items: [] },
          ],
        },
        {
          title: "IELTS",
          items: [
            {
              title: "Preparation Class",
              href: "/course/ielts/preparations",
              items: [],
            },
            {
              title: "Test Booking",
              href: "/course/ielts/bookings",
              items: [],
            },
            { title: "Mock Test", href: "/course/ielts/mocks", items: [] },
          ],
        },
        {
          title: "SAT",
          items: [
            {
              title: "Preparation Class",
              href: "/course/sat/preparations",
              items: [],
            },
            { title: "Test Booking", href: "/course/sat/bookings", items: [] },
            { title: "Mock Test", href: "/course/sat/mocks", items: [] },
          ],
        },
        {
          title: "DUOLINGO",
          items: [
            {
              title: "Preparation Class",
              href: "/course/duolingo/preparations",
              items: [],
            },
            {
              title: "Test Booking",
              href: "/course/duolingo/bookings",
              items: [],
            },
            { title: "Mock Test", href: "/course/duolingo/mocks", items: [] },
          ],
        },
        {
          title: "NAT/JLPT",
          items: [
            {
              title: "Preparation Class",
              href: "/course/nat/preparations",
              items: [],
            },
            {
              title: "Test Booking",
              href: "/course/nat/bookings",
              items: [],
            },
            { title: "Mock Test", href: "/course/nat/mocks", items: [] },
          ],
        },
      ],
    },
    {
      title: "Writing Services",
      items: [
        { title: "CV", href: "/writing/cv", items: [] },
        { title: "SOP", href: "/writing/sop", items: [] },
        { title: "ESSAY", href: "/writing/essay", items: [] },
        { title: "LETTER", href: "/writing/letter", items: [] },
        { title: "ITINERARY", href: "/writing/itinerary", items: [] },
      ],
    },
    {
      title: "Study Abroad",
      items: [
        { title: "Finland", href: "/study-abroad/finland", items: [] },
        { title: "Japan", href: "/study-abroad/japan", items: [] },
      ],
    },
    {
      title: "Visa Services",
      items: [
        { title: "Tourist Visa Service", href: "/visa/tourist", items: [] },
        {
          title: "After Offer Visa Service",
          href: "/visa/after-offer",
          items: [],
        },
      ],
    },
    { title: "Blogs", href: "/blogs", items: [] },
  ],
};

const animationVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const collapsibleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const chevronVariants: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

// Memoized link component
const MobileLink = React.memo<MobileLinkProps>(function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}) {
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push(href.toString());
    onOpenChange?.(false);
  }, [router, href, onOpenChange]);

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
});

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

interface NavItemProps {
  item: NavItemWithChildren;
  onOpenChange: (open: boolean) => void;
  level?: number;
  index?: number;
}

// Memoized navigation item component
const NavItemComponent = React.memo<NavItemProps>(function NavItemComponent({
  item,
  onOpenChange,
  level = 0,
  index = 0,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.items?.length > 0;
  const isNested = level > 0;

  // Memoized class names
  const linkClassName = React.useMemo(
    () =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        level > 0 && "ml-4 border-l-2 border-muted pl-4",
        level > 1 && "ml-8 text-muted-foreground"
      ),
    [level]
  );

  const buttonClassName = React.useMemo(
    () =>
      cn(
        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        level > 0 && "ml-4 border-l-2 border-muted pl-4",
        level > 1 && "ml-8 text-muted-foreground"
      ),
    [level]
  );

  // Render leaf node with link
  if (!hasChildren && item.href) {
    const content = (
      <MobileLink
        href={item.href}
        onOpenChange={onOpenChange}
        className={linkClassName}
      >
        <span>{item.title}</span>
        {item.label && (
          <span className="bg-primary text-primary-foreground ml-auto rounded-md px-1.5 py-0.5 text-xs">
            {item.label}
          </span>
        )}
      </MobileLink>
    );

    return isNested ? (
      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: index * 0.05,
        }}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.div>
    ) : (
      content
    );
  }

  // Render leaf node without link
  if (!hasChildren) {
    const content = (
      <div className={cn(linkClassName, "text-muted-foreground")}>
        <span>{item.title}</span>
      </div>
    );

    return isNested ? (
      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: index * 0.05,
        }}
      >
        {content}
      </motion.div>
    ) : (
      content
    );
  }

  // Render collapsible section
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className={buttonClassName}>
          <div className="flex items-center gap-3">
            <span>{item.title}</span>
            {item.label && (
              <span className="bg-primary text-primary-foreground rounded-md px-1.5 py-0.5 text-xs">
                {item.label}
              </span>
            )}
          </div>
          <motion.div
            variants={chevronVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>
      </CollapsibleTrigger>
      <AnimatePresence initial={false}>
        {isOpen && (
          <CollapsibleContent forceMount>
            <motion.div
              variants={collapsibleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-1 overflow-hidden pb-2"
            >
              {item.items.map((subItem, subIndex) => (
                <NavItemComponent
                  key={subItem.href || `${subItem.title}-${subIndex}`}
                  item={subItem}
                  onOpenChange={onOpenChange}
                  level={level + 1}
                  index={subIndex}
                />
              ))}
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible>
  );
});

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85svh] p-0">
        <DrawerHeader className="border-b">
          <DrawerTitle>Westlingo</DrawerTitle>
          <DrawerDescription>Browser all services!</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 space-y-4 overflow-auto p-4">
          <div className="space-y-4">
            <h3 className="text-muted-foreground mb-3 text-sm font-medium tracking-wider uppercase">
              Main Menu
            </h3>
            {docsConfig.mainNav.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-1 text-sm font-medium transition-colors"
                  >
                    <span>{item.title}</span>
                  </MobileLink>
                )
            )}
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Services
            </h3>
            <div className="space-y-2">
              {docsConfig.sidebarNav.map((item, index) => (
                <NavItemComponent
                  key={`${item.title}-${index}`}
                  item={item}
                  onOpenChange={setOpen}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
