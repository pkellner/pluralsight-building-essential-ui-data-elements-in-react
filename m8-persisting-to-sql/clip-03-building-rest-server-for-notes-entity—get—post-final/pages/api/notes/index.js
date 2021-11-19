import { processGetAndPost } from "../../../lib/restUtils";
import data from "../../../data/notes.json";

export default async function handle(req, res) {
  //await processGetAndPost("note", req, res);

  const { method } = req;
  if (method === "GET") {
    const data = [
      { id: 1, title: "first note" },
      { id: 2, title: "second note" },
    ];
    res.end(JSON.stringify(data, null, "\t"));
  } else {
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
