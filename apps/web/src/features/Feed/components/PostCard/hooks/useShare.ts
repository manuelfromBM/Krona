import { useState } from "react";

export function useShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  function toggle() {
    setIsOpen((current) => !current);
    setMessage("");
  }

  function selectOption(option: string) {
    setMessage(`${option}: opción seleccionada (mock).`);
  }

  return { isOpen, message, toggle, selectOption };
}
