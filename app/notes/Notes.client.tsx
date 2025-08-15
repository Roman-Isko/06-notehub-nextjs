// "use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getNotes } from "../../lib/api";
// import Modal from "../../components/Modal/Modal";
// import NoteForm from "../../components/NoteForm/NoteForm";
// import NoteList from "../../components/NoteList/NoteList";
// import Pagination from "../../components/Pagination/Pagination";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import { Note } from "../../types/note";
// import css from "./Notes.client.module.css";

// interface NotesProps {
//   initialNotes: Note[];
// }

// export default function Notes({ initialNotes }: NotesProps) {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: notes = initialNotes } = useQuery<Note[]>({
//     queryKey: ["notes", page, search],
//     queryFn: () => getNotes({ page, search }),
//     initialData: initialNotes,
//   });

//   return (
//     <div className={css.container}>
//       <SearchBox onSearch={setSearch} />
//       <NoteList notes={notes} />
//       <Pagination page={page} setPage={setPage} />
//       <button onClick={() => setIsModalOpen(true)}>Add Note</button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onClose={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Toaster } from "react-hot-toast";

import { getNotes } from "../../lib/api";

import NoteList from "../../components/NoteList/NoteList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";

import css from "./Notes.client.module.css";

interface NoteType {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface NotesData {
  notes: NoteType[];
  totalPages: number;
}

interface NotesProps {
  initialNotes: NotesData;
}

export default function NotesClient({ initialNotes }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError }: UseQueryResult<NotesData, Error> =
    useQuery<NotesData, Error, NotesData, [string, number, string]>({
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () => getNotes({ page, search: debouncedSearch }),
      initialData: initialNotes, // залишаємо початкові нотатки
      // keepPreviousData прибрано, бо викликає помилку TS
    });

  const handleSearch = (query: string) => setSearch(query);

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBox onSearch={handleSearch} />

      <button onClick={() => setIsOpen(true)} className={css.button}>
        Create note+
      </button>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useDebounce } from "@uidotdev/usehooks";
// import { Toaster } from "react-hot-toast";

// import { fetchNotes } from "../../lib/api";

// import NoteList from "../../components/NoteList/NoteList";
// import Loader from "../../components/Loader/Loader";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import Pagination from "../../components/Pagination/Pagination";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import NoteForm from "../../components/NoteForm/NoteForm";
// import Modal from "../../components/Modal/Modal";

// import css from "./Notes.client.module.css";

// function App() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounce(search, 500);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch]);

//   const { data, isPending, isError } = useQuery({
//     queryKey: ["notes", page, debouncedSearch],
//     queryFn: () => fetchNotes(page, debouncedSearch),
//     placeholderData: (prev) => prev ?? undefined,
//   });

//   const handleSearch = (query: string) => {
//     setSearch(query);
//   };

//   return (
//     <div className={css.container}>
//       <Toaster />
//       <SearchBox onSearch={handleSearch} />

//       <button onClick={() => setIsOpen(true)} className={css.button}>
//         Create note+
//       </button>

//       {isPending && <Loader />}
//       {isError && <ErrorMessage />}
//       {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
//       {data && data.totalPages > 1 && (
//         <Pagination
//           forcePage={page - 1}
//           pageCount={data.totalPages}
//           onPageChange={({ selected }) => setPage(selected + 1)}
//         />
//       )}

//       {isOpen && (
//         <Modal onClose={() => setIsOpen(false)}>
//           <NoteForm onCancel={() => setIsOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default App;
