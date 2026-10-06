"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, BellOff, CheckCircle2, EyeOff, Link2, MoreHorizontal } from "lucide-react";

import styles from "../PostCard.module.css";

interface PostMenuProps {
  postId: string;
  username: string;
  ownerView?: boolean;
}

export function PostMenu({ postId, username, ownerView = false }: PostMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `post-menu-${postId}`;

  // Cierra el menú al presionar Escape o hacer clic fuera de él.
  useEffect(() => {
    function closeMenu(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event instanceof MouseEvent && !menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeMenu);
    };
  }, []);

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => {
      setFeedback("");
      setIsOpen(false);
    }, 1400);
  }

  async function copyPostLink() {
    const url = `${window.location.origin}${window.location.pathname}#post-${postId}`;

    try {
      await navigator.clipboard.writeText(url);
      showFeedback("Enlace copiado");
    } catch {
      showFeedback("No se pudo copiar el enlace");
    }
  }

  return (
    <div className={styles.menuWrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={() => {
          setIsOpen((current) => !current);
          setFeedback("");
        }}
        aria-label="Opciones de la publicación"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div id={menuId} className={styles.postMenu} role="menu">
          {feedback ? (
            <p className={styles.menuFeedback} role="status">
              <CheckCircle2 size={17} /> {feedback}
            </p>
          ) : (
            <>
              {!ownerView && (
                <>
                  <button type="button" role="menuitem" className={styles.dangerOption} onClick={() => showFeedback("Publicación reportada")}>
                    <AlertTriangle size={17} /> Reportar publicación
                  </button>
                  <button type="button" role="menuitem" onClick={() => showFeedback("Verás menos publicaciones como esta")}>
                    <EyeOff size={17} /> No me interesa
                  </button>
                  <button type="button" role="menuitem" onClick={() => showFeedback(`${username} fue silenciado`)}>
                    <BellOff size={17} /> Silenciar cuenta
                  </button>
                </>
              )}
              <button type="button" role="menuitem" onClick={copyPostLink}>
                <Link2 size={17} /> Copiar enlace
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}