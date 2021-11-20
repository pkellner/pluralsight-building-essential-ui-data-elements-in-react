const { PrismaClient } = require("@prisma/client");
const notesData = require("../data/notes.json");
const noteAttributesData = require("../data/noteAttributes.json");
const noteChangeLogsData = require("../data/noteChangeLogs.json");
const tagsData = require("../data/tags.json");
const noteOnTagsData = require("../data/noteOnTags.json");

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const rec of notesData) {
    await prisma.note.create({
      data: rec,
    });
  }

  for (const rec of noteAttributesData) {
    await prisma.noteAttributes.create({
      data: rec,
    });
  }

  for (const rec of noteChangeLogsData) {
    await prisma.noteChangeLog.create({
      data: rec,
    });
  }

  for (const rec of tagsData) {
    await prisma.tag.create({
      data: rec,
    });
  }

  for (const rec of noteOnTagsData) {
    await prisma.noteOnTag.create({
      data: rec,
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
