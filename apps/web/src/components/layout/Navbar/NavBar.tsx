"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ChevronDown, User, LogOut } from "lucide-react";
import { useState } from "react";

import styles from "./Nabvar.module.css";
import { NotificationBell } from "./Notifications/NotificationBell";

export const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <div className={styles.search}>
        <Search
          size={18}
          className={styles.searchIcon}
        />

        <input
          type="text"
          placeholder="Buscar servicios o negocios"
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.location}
          type="button"
        >
          <MapPin size={17} />
          <span>Santiago, Chile</span>
        </button>

        <NotificationBell />

        <div className={styles.profileWrapper}>
          <button
            className={styles.profile}
            type="button"
            aria-label="Abrir menú de perfil"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
          >
            <div className={styles.avatar}>
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                alt="Perfil"
                fill
                sizes="38px"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <ChevronDown size={15} />
          </button>

          {profileOpen && (
            <div className={styles.profileMenu}>
              <Link
                href="/usuarios/perfil"
                className={styles.profileMenuItem}
                onClick={() => setProfileOpen(false)}
              >
                <User size={17} />
                <span>Mi perfil</span>
              </Link>

              <button
                type="button"
                className={styles.profileMenuItem + " " + styles.profileMenuItemLogout}
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={17} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;