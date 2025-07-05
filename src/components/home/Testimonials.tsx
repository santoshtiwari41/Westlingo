import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export default function TestimonialBanner() {
  const trpc = useTRPC();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery(trpc.testimonials.getActive.queryOptions());

  const testimonials = Array.isArray(data)
    ? data.map((t) => ({
        ...t,
        image: t.image ?? undefined,
        bio: t.bio ?? undefined,
      }))
    : [];

  console.log(testimonials);
  if (isLoading) {
    return <div className="py-20 text-center">Loading testimonials...</div>;
  }
  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load testimonials.
      </div>
    );
  }
  if (!testimonials.length) {
    return <div className="py-20 text-center">No testimonials yet.</div>;
  }

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <h2 className="mb-10 text-center text-3xl font-bold">
        Our Student Stories
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className="rounded-xl bg-gray-50 p-6 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-4 flex items-center gap-4">
              <img
                src={
                  t.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4C1D95&color=fff`
                }
                alt={t.name}
                className="h-14 w-14 rounded-full border border-indigo-600 object-cover"
              />
              <div>
                <h4 className="font-semibold text-indigo-600">{t.name}</h4>
                {t.bio && (
                  <div className="mt-0.5 text-xs text-zinc-500">{t.bio}</div>
                )}
              </div>
            </div>
            <p className="text-gray-700 italic">“{t.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
