-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteAttributes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "important" INTEGER,
    "pinned" INTEGER,
    "updateDate" TEXT
);
INSERT INTO "new_NoteAttributes" ("id", "important", "noteId", "pinned", "updateDate") SELECT "id", "important", "noteId", "pinned", "updateDate" FROM "NoteAttributes";
DROP TABLE "NoteAttributes";
ALTER TABLE "new_NoteAttributes" RENAME TO "NoteAttributes";
CREATE UNIQUE INDEX "NoteAttributes_id_noteId_key" ON "NoteAttributes"("id", "noteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
