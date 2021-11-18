-- RedefineIndex
DROP INDEX "NoteAttributes_id_noteId_key";
CREATE UNIQUE INDEX "NoteAttributes.id_noteId_unique" ON "NoteAttributes"("id", "noteId");

-- RedefineIndex
DROP INDEX "NoteOnTag_noteId_tagId_key";
CREATE UNIQUE INDEX "NoteOnTag.noteId_tagId_unique" ON "NoteOnTag"("noteId", "tagId");
