"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CalendarCheck, Check, Mail, Megaphone } from "lucide-react";

import styles from "./NotificationBell.module.css";
import { mockNotifications } from "./mockNotifications";
import type { NotificationItem } from "./notification.types";

const ICONS = {
  reservation: CalendarCheck,
  message: Mail,
  promotion: Megaphone,
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const containerRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  // Cierra el panel al hacer clic fuera o presionar Escape.
  useEffect(() => {
    function closePanel(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event instanceof MouseEvent && !containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closePanel);
    document.addEventListener("keydown", closePanel);
    return () => {
      document.removeEventListener("mousedown", closePanel);
      document.removeEventListener("keydown", closePanel);
    };
  }, []);

  function markAsRead(id: string) {
    setNotifications((current) => current.map((item) => (
      item.id === id ? { ...item, read: true } : item
    )));
  }

  function markAllAsRead() {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={`Notificaciones: ${unreadCount} sin leer`}
        aria-expanded={isOpen}
        aria-controls="notifications-panel"
      >
        <Bell size={19} />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <section id="notifications-panel" className={styles.panel} aria-label="Notificaciones">
          <header className={styles.header}>
            <div>
              <h2>Notificaciones</h2>
              <p>{unreadCount ? `${unreadCount} sin leer` : "Estás al día"}</p>
            </div>
            {unreadCount > 0 && (
              <button type="button" onClick={markAllAsRead}>Marcar todas como leídas</button>
            )}
          </header>

          <div className={styles.list}>
            {notifications.map((notification) => {
              const Icon = ICONS[notification.type];
              return (
                <button
                  key={notification.id}
                  type="button"
                  className={`${styles.item} ${!notification.read ? styles.unread : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <span className={`${styles.icon} ${styles[notification.type]}`}><Icon size={17} /></span>
                  <span className={styles.content}>
                    <strong>{notification.title}</strong>
                    <span>{notification.description}</span>
                    <small>{notification.time}</small>
                  </span>
                  {!notification.read && <span className={styles.unreadDot} aria-label="Sin leer" />}
                  {notification.read && <Check size={14} className={styles.readIcon} aria-label="Leída" />}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
