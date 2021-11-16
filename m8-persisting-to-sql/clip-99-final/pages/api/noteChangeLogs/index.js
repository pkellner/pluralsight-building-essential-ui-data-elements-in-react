import prisma from "../../../lib/prisma";
import { processGetAndPost } from "../../../lib/restUtils";

export default async function handle(req, res) {
  await processGetAndPost(prisma.noteChangeLog, req, res);
}
