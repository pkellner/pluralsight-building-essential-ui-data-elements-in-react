import { processGetAndPost } from "../../../lib/restUtils";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  await processGetAndPost(prisma.note, req, res);
}
