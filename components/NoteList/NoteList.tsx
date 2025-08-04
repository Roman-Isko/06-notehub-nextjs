import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../components/lib/api";
import type { Note } from "../types/notes";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.item}>
          <h2>{title}</h2>
          <p>{content}</p>
          <span>{tag}</span>
          <button className={css.delete} onClick={() => mutation.mutate(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
