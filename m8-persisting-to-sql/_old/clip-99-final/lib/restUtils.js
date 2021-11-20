import prisma, { errorFormat } from "./prisma";

export async function processGetAndPost(dbEntity, req, res) {
  const { method } = req;
  //console.log(`processGetAndPost:method:${method}`);
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

export async function processGetOnePutAndDelete(dbEntity, req, res) {
  const { method } = req;
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

export async function handleGetOne(dbEntity, req, res, primaryKeyId) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    const data = await dbEntity.findMany({
      where: { id: primaryKeyId },
    });
    if (data && data.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data[0], null, "\t"));
    } else {
      res.status(404).end("not found");
    }
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

async function handlePut(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    const result = await dbEntity.update({
      where: { id: primaryKeyId },
      data: { ...req.body },
    });
    res.status(200).end(JSON.stringify(result, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

async function handleDelete(dbEntity, req, res) {
  try {
    const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
    const result = await dbEntity.delete({
      where: { id: primaryKeyId },
    });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

export async function handleGet(dbEntity, res) {
  try {
    const data = await dbEntity.findMany();
    // const data = await prisma.note.findMany({
    //   where: { xx: 'Alice' },
    // });
    res.end(JSON.stringify(data ?? [], null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}

export async function handlePost(dbEntity, req, res) {
  try {
    const result = await dbEntity.create({
      data: { ...req.body },
    });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result, null, "\t"));
  } catch (e) {
    res.status(400).end(errorFormat(e?.message));
  }
}
