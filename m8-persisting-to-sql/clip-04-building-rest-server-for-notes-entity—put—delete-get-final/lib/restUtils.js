import data from "../data/notes.json";

function errorFormat(error) {
  console.log(`/lib/restUtils: errorFormat: ${error} ${new Date().toISOString()}`);
}

// REST URL's WITHOUT key appended

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

//
// REST URL's WITH key appended
//

export async function processGetOnePutAndDelete(dbEntity, req, res) {
  const {method} = req;
  switch (method) {
    case "GET":
      await handleGetOne(dbEntity, req, res);
      break;
    case "PUT":
      await handlePut(dbEntity, req, res);
      break;
    case "DELETE":
      await handleDelete(dbEntity, req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function handleGetOne(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    if (data && primaryKeyId < data.length)  {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data[primaryKeyId], null, "\t"));
    } else {
      res.status(404).end("not found");
    }
  } catch (e) {
    res.status(400).end(errorFormat("general error"));
  }
}

async function handlePut(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    res.status(200).end(JSON.stringify(data[0], null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

async function handleDelete(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data[0], null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}