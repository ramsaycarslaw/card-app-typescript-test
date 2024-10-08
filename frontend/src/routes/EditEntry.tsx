import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled: new Date() };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const entry = entries.find((entry) => entry.id === id);
    if (entry) {
      setNewEntry(entry);
    } else {
      setNewEntry(emptyEntry);
    }
  }, [entries, id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newEntry) {
      setNewEntry({
        ...newEntry,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    if (newEntry) {
      updateEntry(id as string, newEntry);
    }
  };

  // Render only when newEntry is defined
  if (!newEntry) {
    return <div>Loading...</div>; // Optionally add a loading state or redirect
  }

  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md dark:bg-gray-900">
      <input
        className="p-3 rounded-md dark:bg-gray-800"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md dark:bg-gray-800"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md dark:bg-gray-800"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md dark:bg-gray-800"
        type="date"
        name="scheduled"
        value={new Date(newEntry.scheduled).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md dark:bg-purple-500 dark:hover:bg-purple-900"
      >
        Update
      </button>
    </section>
  );
}
