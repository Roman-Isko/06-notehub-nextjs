import { Note } from "../types/note";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};
if (TOKEN) {
  headers["Authorization"] = `Bearer ${TOKEN}`;
}

// Отримати список нотаток
export async function getNotes({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<{ notes: Note[]; totalPages: number }> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (search) params.append("search", search);

  const res = await fetch(`${API_URL}/notes?${params.toString()}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = await res.json();

  // Очікуваний формат: { notes: Note[], totalPages: number }
  if (!Array.isArray(data.notes) || typeof data.totalPages !== "number") {
    throw new Error(
      "Invalid API response format: expected { notes: Note[], totalPages: number }"
    );
  }

  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
}

// Отримати нотатку за ID
export async function getNoteById(id: string): Promise<Note> {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Note not found");
  }

  return res.json();
}

// Створити нову нотатку
export async function createNote(note: Omit<Note, "id">): Promise<Note> {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return res.json();
}

// Оновити нотатку
export async function updateNote(
  id: string,
  note: Partial<Omit<Note, "id">>
): Promise<Note> {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  return res.json();
}

// Видалити нотатку
export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to delete note");
  }
}

// import { Note } from "../types/note";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
// const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// const headers: Record<string, string> = {
//   "Content-Type": "application/json",
// };
// if (TOKEN) {
//   headers["Authorization"] = `Bearer ${TOKEN}`;
// }

// // Отримати список нотаток
// export async function getNotes({
//   page,
//   search,
// }: {
//   page: number;
//   search: string;
// }): Promise<Note[]> {
//   const params = new URLSearchParams();
//   params.append("page", page.toString());
//   if (search) params.append("search", search);

//   const res = await fetch(`${API_URL}/notes?${params.toString()}`, {
//     headers,
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch notes");
//   }

//   const data = await res.json();

//   // Передбачаємо, що API повертає об'єкт з масивом у полі notes
//   if (!Array.isArray(data.notes)) {
//     throw new Error("Invalid API response format: 'notes' is not an array");
//   }

//   return data.notes;
// }

// // Отримати нотатку за ID
// export async function getNoteById(id: string): Promise<Note> {
//   const res = await fetch(`${API_URL}/notes/${id}`, {
//     headers,
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Note not found");
//   }

//   return res.json();
// }

// // Створити нову нотатку
// export async function createNote(note: Omit<Note, "id">): Promise<Note> {
//   const res = await fetch(`${API_URL}/notes`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(note),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create note");
//   }

//   return res.json();
// }

// // Оновити нотатку
// export async function updateNote(
//   id: string,
//   note: Partial<Omit<Note, "id">>
// ): Promise<Note> {
//   const res = await fetch(`${API_URL}/notes/${id}`, {
//     method: "PATCH",
//     headers,
//     body: JSON.stringify(note),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to update note");
//   }

//   return res.json();
// }

// // Видалити нотатку
// export async function deleteNote(id: string): Promise<void> {
//   const res = await fetch(`${API_URL}/notes/${id}`, {
//     method: "DELETE",
//     headers,
//   });

//   if (!res.ok) {
//     throw new Error("Failed to delete note");
//   }
// }
