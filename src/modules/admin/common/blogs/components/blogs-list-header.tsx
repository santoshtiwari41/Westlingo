"use client";

import Link from "next/link";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const BlogsListHeader = () => {
  return (
    <>
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">Blogs</h5>
          <Button asChild>
            <Link href="/admin/blogs/new">
              <PlusIcon />
              New Blog
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default BlogsListHeader;
