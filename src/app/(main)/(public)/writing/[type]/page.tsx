"use server";

import { headers } from "next/headers";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { visaTypes, writingTiers, writingTypes } from "@/db/schema";
import { auth } from "@/lib/auth";

import GenericWritingClient from "./GenericWritingClient";

interface Props {
  params: Promise<{ type: string }>;
}
export default async function WritingTypePage({ params }: Props) {
  const { type } = await params;
  const typeName = type.replace(/-/g, " ").toUpperCase(); // e.g. 'cv' -> 'CV', 'personal-statement' -> 'PERSONAL STATEMENT'

  const writingTypeRow = await db
    .select()
    .from(writingTypes)
    .where(eq(writingTypes.name, typeName));
  const writingTypeId = writingTypeRow[0]?.id;
  const tiers = await db.select().from(writingTiers);
  const visaTypeOptions = await db.select().from(visaTypes);

  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id ?? null;

  return (
    <GenericWritingClient
      userId={userId}
      writingTypeId={writingTypeId}
      tiers={tiers}
      visaTypes={visaTypeOptions}
      typeName={typeName}
      imageUrl={`/${type}.png`}
    />
  );
}
