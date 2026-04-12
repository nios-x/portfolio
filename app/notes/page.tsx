"use client";
import { useEffect, useState } from "react";

interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);

  const loadNotes = async () => {
    const res = await fetch("/api/notes", { cache: "no-store" });
    const data = await res.json();
    setNotes(data.notes || []);
    if (!selected && data.notes?.length) {
      setSelected(data.notes[0]);
    }
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nf min-h-screen px-6 pb-12 pt-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      <div className="border border-zinc-200 rounded-3xl p-4 bg-white/70 backdrop-blur flex flex-col gap-3">
        <div className="font-semibold">Notes</div>
        <div className="text-xs text-zinc-500">Read only</div>
        <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto pr-1">
          {notes.map((note) => (
            <button
              key={note._id}
              className={`text-left border border-zinc-200 rounded-lg px-3 py-2 hover:bg-black/5 transition ${
                selected?._id === note._id ? "bg-black text-white" : "bg-white"
              }`}
              onClick={() => setSelected(note)}
            >
              <div className="text-sm line-clamp-2">{note.content || "(empty)"}</div>
              <div className="text-[11px] text-zinc-500 mt-1">{new Date(note.createdAt).toLocaleString()}</div>
            </button>
          ))}
          {notes.length === 0 && <div className="text-sm text-zinc-500">No notes yet.</div>}
        </div>
      </div>

      <div className="border border-zinc-200 rounded-3xl p-4 bg-white/70 backdrop-blur flex flex-col gap-3">
        {!selected ? (
          <div className="text-sm text-zinc-500">Select a note to view.</div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="font-semibold">Note</div>
              <div className="text-xs text-zinc-500">{new Date(selected.createdAt).toLocaleString()}</div>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed border border-zinc-200 rounded-lg px-3 py-3 bg-white/80">
              {selected.content || "(empty)"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
