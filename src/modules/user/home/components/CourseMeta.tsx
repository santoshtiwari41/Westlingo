import { format } from "date-fns";
import { CalendarDays, RefreshCw } from "lucide-react";

const CourseMeta = ({ data }: { data: any }) => (
  <div className="text-muted-foreground mt-8 flex items-center justify-between border-t pt-4 text-sm">
    <span className="flex items-center gap-1">
      <CalendarDays className="size-4 text-purple-600" />
      Created: {format(new Date(data.createdAt), "MMM dd, yyyy")}
    </span>
    <span className="flex items-center gap-1">
      <RefreshCw className="size-4 text-purple-600" />
      Last updated: {format(new Date(data.updatedAt), "MMM dd, yyyy")}
    </span>
  </div>
);

export default CourseMeta;
