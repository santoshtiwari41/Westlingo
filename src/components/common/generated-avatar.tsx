import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const GeneratedAvatar = ({
  seed,
  variant,
  className,
}: {
  seed?: string;
  className?: string;
  variant: "botttsNeutral" | "initials";
}) => {
  // Provide a fallback seed if none is provided
  const safeSeed = seed || "default";

  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed: safeSeed });
  } else {
    avatar = createAvatar(initials, {
      seed: safeSeed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="avatar" />
      <AvatarFallback>{safeSeed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default GeneratedAvatar;
