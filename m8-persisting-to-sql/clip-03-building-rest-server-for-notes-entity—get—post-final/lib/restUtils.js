import data from "../data/notes.json";

function errorFormat(error) {
  console.log(`restutils: errorFormat: ${error}`);
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
    res.end(JSON.stringify(data ?? [], null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

export async function handlePost(dbEntity, req, res) {
  try {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data[0], null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}
