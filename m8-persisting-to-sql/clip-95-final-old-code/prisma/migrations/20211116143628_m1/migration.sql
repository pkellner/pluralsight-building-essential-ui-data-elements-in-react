-- RedefineIndex
DROP INDEX "NoteAttributes.id_noteId_unique";
CREATE UNIQUE INDEX "NoteAttributes_id_noteId_key" ON "NoteAttributes"("id", "noteId");

-- RedefineIndex
DROP INDEX "NoteOnTag.noteId_tagId_unique";
CREATE UNIQUE INDEX "NoteOnTag_noteId_tagId_key" ON "NoteOnTag"("noteId", "tagId");
