"use client";

import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, PlusIcon, Trash2Icon } from "lucide-react";

import NewTestimonialForm from "@/modules/admin/common/testimonials/components/new-testimonial-form";
import type { Testimonial } from "@/modules/admin/common/testimonials/types";
import { useTRPC } from "@/trpc/client";

export default function AdminTestimonialsPage() {
  const [open, setOpen] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(
    null
  );
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery(trpc.testimonials.getMany.queryOptions());
  const deleteMutation = useMutation(
    trpc.testimonials.delete.mutationOptions({
      onSuccess: () =>
        queryClient.invalidateQueries(trpc.testimonials.getMany.queryOptions()),
    })
  );

  const handleEdit = (testimonial: Testimonial) => {
    setEditTestimonial(testimonial);
    setOpen(true);
  };
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Testimonials Management
          </h1>
          <p className="mt-1 text-base text-zinc-500">
            Showcase and manage your students' success stories.
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 font-semibold text-white shadow transition hover:from-purple-700 hover:to-indigo-700"
          onClick={() => {
            setEditTestimonial(null);
            setOpen(true);
          }}
        >
          <PlusIcon className="h-5 w-5" />
          New Testimonial
        </button>
      </div>
      <div className="my-8" />
      {/* List testimonials */}
      {isLoading ? (
        <div className="text-center text-lg text-zinc-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">
          Failed to load testimonials.
        </div>
      ) : !data.length ? (
        <div className="text-center text-zinc-400">No testimonials yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.map((t) => (
            <div
              key={t.id}
              className="group relative flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <img
                src={
                  t.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4C1D95&color=fff`
                }
                alt={t.name}
                className="h-16 w-16 rounded-full border-2 border-indigo-600 object-cover shadow transition group-hover:scale-105"
              />
              <div className="flex-1">
                <div className="mb-1 flex flex-col gap-0.5 text-lg font-semibold text-indigo-700 md:flex-row md:items-center md:gap-2">
                  <span>{t.name}</span>
                  {t.bio && (
                    <span className="text-xs font-normal text-zinc-500 md:ml-2">
                      {t.bio}
                    </span>
                  )}
                  <button
                    onClick={() =>
                      handleEdit({
                        ...t,
                        image: t.image ?? "",
                        bio: t.bio ?? "",
                      })
                    }
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    <Edit2Icon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </div>
                <blockquote className="mb-2 border-l-4 border-purple-200 pl-4 text-zinc-700 italic">
                  “{t.quote}”
                </blockquote>
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${t.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {t.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-2xl">
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-zinc-400 hover:text-zinc-700"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="mb-4 text-xl font-bold text-zinc-900">
              {editTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <NewTestimonialForm
              onSuccess={() => {
                setOpen(false);
                setEditTestimonial(null);
              }}
              initialValues={editTestimonial || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
