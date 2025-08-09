"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../../lib/api";
import { useParams } from "next/navigation";
import NoteDetails from "./NoteDetails.client";

export default function NotePage() {
  const params = useParams();

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => {
      if (!id) throw new Error("Invalid ID");
      return getNoteById(id);
    },
    enabled: Boolean(id),
  });

  if (!id) return <p>Invalid note ID</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note</p>;
  if (!note) return <p>Note not found</p>;

  return <NoteDetails note={note} />;
}
