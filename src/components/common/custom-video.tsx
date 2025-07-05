"use client";

import { AspectRatio } from "../ui/aspect-ratio";

const CustomVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div>
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        <iframe
          src={videoUrl}
          className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </AspectRatio>
    </div>
  );
};

export default CustomVideo;
