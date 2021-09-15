import NoteCard from "./NoteCard";

function NoteList() {
  const notesData = [
    {
      id: "1",
      title: "Get hotel",
      description: "Prefer Best Westerns",
      createDate: "2021-07-11T13:32:10.000Z",
    },
    {
      id: "2",
      title: "Fill car with gas",
      description: "Make sure to get Shell",
      createDate: "2021-07-11T13:31:34.000Z",
    },
    {
      id: "3",
      title: "Pack bathing suit",
      description: "Make sure to bring extra bathing suit",
      createDate: "2021-07-11T13:33:07.000Z",
    },
  ];

  return (
    <div className="row tab-content bg-transparent note-has-grid">
      {notesData.map((note) => {
        return <NoteCard note={note} key={note.id} />;
      })}
    </div>
  );
}

export default NoteList;
