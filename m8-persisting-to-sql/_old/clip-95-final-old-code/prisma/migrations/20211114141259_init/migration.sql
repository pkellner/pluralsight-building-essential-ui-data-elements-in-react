-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteChangeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changeDate" TEXT
);
INSERT INTO "new_NoteChangeLog" ("changeDate", "id", "noteId", "operation") SELECT "changeDate", "id", "noteId", "operation" FROM "NoteChangeLog";
DROP TABLE "NoteChangeLog";
ALTER TABLE "new_NoteChangeLog" RENAME TO "NoteChangeLog";
CREATE TABLE "new_NoteAttributes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "important" INTEGER NOT NULL,
    "pinned" INTEGER NOT NULL,
    "updateDate" TEXT
);
INSERT INTO "new_NoteAttributes" ("id", "important", "noteId", "pinned", "updateDate") SELECT "id", "important", "noteId", "pinned", "updateDate" FROM "NoteAttributes";
DROP TABLE "NoteAttributes";
ALTER TABLE "new_NoteAttributes" RENAME TO "NoteAttributes";
CREATE UNIQUE INDEX "NoteAttributes_id_noteId_key" ON "NoteAttributes"("id", "noteId");
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createDate" TEXT
);
INSERT INTO "new_Note" ("createDate", "description", "id", "title") SELECT "createDate", "description", "id", "title" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_NoteOnTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TEXT
);
INSERT INTO "new_NoteOnTag" ("createdAt", "id", "noteId", "tagId") SELECT "createdAt", "id", "noteId", "tagId" FROM "NoteOnTag";
DROP TABLE "NoteOnTag";
ALTER TABLE "new_NoteOnTag" RENAME TO "NoteOnTag";
CREATE UNIQUE INDEX "NoteOnTag_noteId_tagId_key" ON "NoteOnTag"("noteId", "tagId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
