import { Suspense } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import SlotDetailView from "@/modules/admin/reservations/views/slot-detail-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ slotId: string }>;
}
const page = async ({ params }: Props) => {
  const { slotId } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.reservationSlots.getOne.queryOptions({ id: slotId })
  );
  await queryClient.prefetchQuery(
    trpc.reservations.getBySlot.queryOptions({ slotId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading slot...</div>}>
        <ErrorBoundary fallback={<div>Error loading slot.</div>}>
          <SlotDetailView slotId={slotId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
