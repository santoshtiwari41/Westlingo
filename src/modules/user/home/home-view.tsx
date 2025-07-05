"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import TipTap from "@/components/tiptap";
import { useTRPC } from "@/trpc/client";

const HomeView = () => {
  const [content, setContent] = useState("");
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Nabin Dhami" }));

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {data?.greeting}
      <TipTap content={content} onChange={setContent} />
    </div>
  );
};

export default HomeView;
