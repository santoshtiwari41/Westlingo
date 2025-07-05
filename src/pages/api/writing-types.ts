import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { writingTypes } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const types = await db.select().from(writingTypes);
  res.status(200).json(types);
}
