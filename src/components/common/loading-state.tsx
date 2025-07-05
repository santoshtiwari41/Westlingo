import { Loader2Icon } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}

const LoadingState = ({}: LoadingStateProps) => {
  return (
    <div className="flex min-h-[40rem] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 backdrop-blur-2xl">
        <Loader2Icon className="text-primary size-6 animate-spin" />
      </div>
    </div>
  );
};

export default LoadingState;
