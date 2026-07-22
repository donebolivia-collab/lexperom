"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addNote } from "./actions";
import type { Note } from "@/types/database";

interface NotesPanelProps {
  consultationId: string;
  notes: Note[];
}

export function NotesPanel({ consultationId, notes }: NotesPanelProps) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setError(null);
    startTransition(async () => {
      try {
        await addNote(consultationId, body);
        setBody("");
      } catch {
        setError("No se pudo guardar la nota.");
      }
    });
  }

  return (
    <div className="space-y-4">
      {notes.length === 0 ? (
        <p className="text-sm text-muted">Todavía no hay notas internas.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="rounded-md border border-line bg-paper px-3 py-2 text-sm">
              <p className="text-ink-soft">{note.body}</p>
              <p className="mt-1 text-xs text-muted">
                {new Date(note.created_at).toLocaleString("es-BO")}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Agregar una nota interna…"
          rows={3}
        />
        {error && <p className="text-xs text-urgency-critico">{error}</p>}
        <Button type="submit" size="sm" variant="secondary" disabled={isPending || !body.trim()}>
          {isPending ? "Guardando…" : "Agregar nota"}
        </Button>
      </form>
    </div>
  );
}
