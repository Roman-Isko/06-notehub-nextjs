import { TanStackProvider } from "../../components/TanStackProvider/TanStackProvider";
import NotesClient from "./Notes.client";

export const metadata = {
  title: "NoteHub | Нотатки",
};

export default function NotesPage() {
  return (
    <TanStackProvider>
      <NotesClient />
    </TanStackProvider>
  );
}
