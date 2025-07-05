import React from "react";

import { cn } from "@/lib/utils";

const CustomSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("rounded-md bg-gray-50 py-16", className)}>
      {children}
    </section>
  );
};

export default CustomSection;
