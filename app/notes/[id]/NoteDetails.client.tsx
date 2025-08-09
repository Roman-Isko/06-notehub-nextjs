"use client";

import { Note } from "../../../types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  note: Note;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  const { title, content, tag, createdAt, updatedAt } = note;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.tag}>#{tag}</p>
      <p className={css.content}>{content}</p>

      <div className={css.meta}>
        <p>
          <strong>Created:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
