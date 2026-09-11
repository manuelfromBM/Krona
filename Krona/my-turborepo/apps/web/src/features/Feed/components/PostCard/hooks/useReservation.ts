import { useEffect, useRef, useState } from "react";

export function useReservation() {
  const [isReserved, setIsReserved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
  }, []);

  function confirm(date: string, time: string) {
    setIsReserved(true);
    setIsOpen(false);
    setNotice(`Cita agendada para ${date} a las ${time}`);

    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 4000);
  }

  return {
    isReserved,
    isOpen,
    notice,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    confirm,
  };
}
