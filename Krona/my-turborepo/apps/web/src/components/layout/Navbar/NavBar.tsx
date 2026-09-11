"use client";

import Image from "next/image";

import { Search, MapPin, ChevronDown } from "lucide-react";

import styles from "./Nabvar.module.css";
import { NotificationBell } from "./Notifications/NotificationBell";

export const Navbar = () => {
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

        <button
          className={styles.profile}
          type="button"
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
      </div>
    </div>
  );
};

export default Navbar;
