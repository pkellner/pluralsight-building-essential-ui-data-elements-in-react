import prisma from "../../../lib/prisma";
import { processGetAndPost } from "../../../lib/restUtils";

export default async function handle(req, res) {
  await processGetAndPost(prisma.note, req, res);
}
