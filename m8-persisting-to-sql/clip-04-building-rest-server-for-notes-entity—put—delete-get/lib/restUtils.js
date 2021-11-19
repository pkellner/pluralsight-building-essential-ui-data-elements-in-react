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

export async function processGetOnePutAndDelete(dbEntity, req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      await handleGetOne(dbEntity, req, res);
      break;
    case "PUT":
      await handlePut(dbEntity, req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function handleGetOne(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    if (data && primaryKeyId < data.length) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({}, null, "\t"));
    }
  } catch (e) {
    res.status(400).end(errorFormat("general error"));
  }
}

async function handlePut(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    res.status(200).end(JSON.stringify({}, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat("general error"));
  }
}

async function handleDelete(dbEntity, req, res) {
  try {
    const primaryKey = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({id: 1}, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat("general error"));
  }
}
