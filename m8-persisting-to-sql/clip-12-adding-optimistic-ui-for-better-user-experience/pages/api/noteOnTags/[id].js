import { processGetOnePutAndDelete } from "../../../lib/restUtils";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  await processGetOnePutAndDelete(prisma.noteOnTag, req, res);
}
