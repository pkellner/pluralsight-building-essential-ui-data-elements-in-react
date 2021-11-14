-- CreateTable
CREATE TABLE "NoteAttributes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "important" INTEGER NOT NULL,
    "pinned" INTEGER NOT NULL,
    "updateDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NoteChangeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changeDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tagName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NoteOnTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NoteAttributes.id_noteId_unique" ON "NoteAttributes"("id", "noteId");

-- CreateIndex
CREATE UNIQUE INDEX "NoteOnTag.noteId_tagId_unique" ON "NoteOnTag"("noteId", "tagId");
