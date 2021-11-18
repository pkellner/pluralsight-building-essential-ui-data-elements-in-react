import prisma from "../../../lib/prisma";
import { processGetOnePutAndDelete } from "../../../lib/restUtils";

export default async function handle(req, res) {
  await processGetOnePutAndDelete(prisma.tag, req, res);
}
