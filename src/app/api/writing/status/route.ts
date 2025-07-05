import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { writing } from "@/db/schema";

const ALLOWED_STATUSES = ["pending", "success", "cancel"];

export async function POST(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "Invalid id or status" },
      { status: 400 }
    );
  }
  await db.update(writing).set({ status }).where(eq(writing.id, id));
  return NextResponse.json({ success: true });
}
