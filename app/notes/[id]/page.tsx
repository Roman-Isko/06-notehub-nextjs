"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../../lib/api";
import { useParams } from "next/navigation";
import NoteDetails from "../../../components/NoteDetails/NoteDetails";

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
    queryFn: () => getNoteById(id!),
    enabled: !!id,
  });

  if (!id) return <p>Invalid note ID</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note</p>;
  if (!note) return <p>Note not found</p>;

  return <NoteDetails note={note} />;
}
