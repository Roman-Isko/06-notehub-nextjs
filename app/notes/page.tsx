import { TanStackProvider } from "../../components/TanStackProvider/TanStackProvider";
import NotesClient from "../../components/Notes/Notes.client";

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
