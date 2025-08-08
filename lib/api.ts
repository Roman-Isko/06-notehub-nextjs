// import axios from "axios";
// import type { Note, NoteTag } from "../types/notes";

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export interface CreateNoteData {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

// const instance = axios.create({
//   baseURL: "https://notehub-public.goit.study/api",
// });

// export const fetchNotes = async (
//   page: number,
//   search?: string
// ): Promise<FetchNotesResponse> => {
//   const params: Record<string, unknown> = { page, perPage: 12 };
//   if (search) params.search = search;
//   const res = await instance.get<FetchNotesResponse>("/notes", { params });
//   return res.data;
// };

// export const createNote = async (data: CreateNoteData): Promise<Note> => {
//   const res = await instance.post<Note>("/notes", data);
//   return res.data;
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   if (!id) throw new Error("Note ID is required for deletion");
//   const res = await instance.delete<Note>(`/notes/${id}`);
//   return res.data;
// };

// export const getNoteById = async (id: string): Promise<Note> => {
//   if (!id) throw new Error("Note ID is required");
//   const res = await instance.get<Note>(`/notes/${id}`);
//   return res.data;
// };

import axios from "axios";
import type { Note, NoteTag } from "../types/notes";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

// Опційно беремо токен, якщо він заданий
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
});

export const fetchNotes = async (
  page: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page, perPage: 12 };
  if (search) params.search = search;

  const res = await instance.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const res = await instance.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID for deletion");
  }
  const res = await instance.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID for fetching");
  }
  const res = await instance.get<Note>(`/notes/${id}`);
  return res.data;
};

// import axios from "axios";
// import type { Note, NoteTag } from "../types/notes";

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export interface CreateNoteData {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

// const instance = axios.create({
//   baseURL: "https://notehub-public.goit.study/api",
//   headers: {
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//   },
// });

// export const fetchNotes = async (
//   page: number,
//   search?: string
// ): Promise<FetchNotesResponse> => {
//   const params: Record<string, unknown> = { page, perPage: 12 };
//   if (search) params.search = search;
//   const res = await instance.get<FetchNotesResponse>("/notes", { params });
//   return res.data;
// };

// export const createNote = async (data: CreateNoteData): Promise<Note> => {
//   const res = await instance.post<Note>("/notes", data);
//   return res.data;
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   const res = await instance.delete<Note>(`/notes/${id}`);
//   return res.data;
// };

// export const getNoteById = async (id: string): Promise<Note> => {
//   const res = await instance.get<Note>(`/notes/${id}`);
//   return res.data;
// };
