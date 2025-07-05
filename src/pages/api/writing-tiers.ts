import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { writingTiers } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tiers = await db.select().from(writingTiers);
  res.status(200).json(tiers);
}
