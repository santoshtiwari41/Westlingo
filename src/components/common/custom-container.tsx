import { cn } from "@/lib/utils";

interface CustomContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CustomContainer = ({ children, className }: CustomContainerProps) => {
  return (
    <div className={cn("container mx-auto my-10 px-4 sm:px-0", className)}>
      {children}
    </div>
  );
};

export default CustomContainer;
