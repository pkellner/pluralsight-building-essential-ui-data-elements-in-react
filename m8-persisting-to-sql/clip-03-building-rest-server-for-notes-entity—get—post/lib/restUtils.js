function errorFormat(error) {
  console.log(`restUtils: errorFormat: ${error}`);
}
export async function processGetAndPost(dbEntity, req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      await handleGet(dbEntity, res);
      break;
    case "POST":
      await handlePost(dbEntity, req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function handleGet(dbEntity, res) {
  try {
    const data = [
      { id: 1, title: "first note" },
      { id: 2, title: "second note" },
    ];
    res.end(JSON.stringify(data, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

export async function handlePost(dbEntity, req, res) {
  try {
    res.setHeader("Content-Type", "application/json");
    const record = { id: 2, title: "second one" };
    res.end(JSON.stringify(record, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}
