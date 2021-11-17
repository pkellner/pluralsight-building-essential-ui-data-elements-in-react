import { processGetOnePutAndDelete } from "../../../lib/restUtils";

export default async function handle(req, res) {
  await processGetOnePutAndDelete("note", req, res);
}
