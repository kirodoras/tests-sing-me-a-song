import { Request, Response } from "express";
import { prisma } from "../database.js";

export async function resetDatabase(_req: Request, res: Response) {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY CASCADE;`;
  res.sendStatus(200);
}
