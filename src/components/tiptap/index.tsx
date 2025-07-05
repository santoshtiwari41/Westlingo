"use client";

import React from "react";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./menu-bar";

interface TipTapProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

export default function TipTap({
  content,
  onChange,
  editable = false,
}: TipTapProps) {
  const editor = useEditor({
    editable,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-3" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-3" } },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    content,
    editorProps: {
      attributes: {
        class: editable
          ? "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3"
          : "pointer-events-none select-none bg-white",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
