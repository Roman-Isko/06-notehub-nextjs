import React from "react";
import { getNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const initialNotes = await getNotes({ page: 1, search: "" });

  return <NotesClient initialNotes={initialNotes} />;
}

// import React, { JSX } from "react";
// import { getNotes } from "../../lib/api";
// import NotesClient from "./Notes.client";
// import { Note } from "../../types/note";

// export default async function NotesPage(): Promise<JSX.Element> {
//   const notes: Note[] = await getNotes({ page: 1, search: "" });
//   return <NotesClient initialNotes={notes} />;
// }
