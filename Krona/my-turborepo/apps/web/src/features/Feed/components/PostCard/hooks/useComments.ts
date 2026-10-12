import { useState, type FormEvent } from "react";

export function useComments(initialCount: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  function toggle() {
    setIsOpen((current) => !current);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setComments((current) => [...current, text]);
    setDraft("");
    setIsOpen(true);
  }

  return {
    isOpen,
    draft,
    comments,
    total: initialCount + comments.length,
    setDraft,
    toggle,
    submit,
  };
}
