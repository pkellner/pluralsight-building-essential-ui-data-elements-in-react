import { processGetAndPost } from "../../../lib/restUtils";

export default async function handle(req, res) {
  await processGetAndPost("note", req, res);
}
