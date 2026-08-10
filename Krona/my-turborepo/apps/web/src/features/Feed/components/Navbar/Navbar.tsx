"use client";

import Image from "next/image";

import {
  Search,
  MapPin,
  Bell,
  ChevronDown,
} from "lucide-react";

import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <header className={styles.navbar}>

      {/* BUSCADOR */}
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


      {/* DERECHA */}
      <div className={styles.right}>

        {/* UBICACIÓN */}
        <button
          className={styles.location}
          type="button"
        >
          <MapPin
            size={17}
            className={styles.locationPin}
          />

          <span>Santiago, Chile</span>
        </button>


        {/* NOTIFICACIONES */}
        <button
          className={styles.notifBtn}
          type="button"
          aria-label="Notificaciones"
        >
          <Bell size={19} />

          <span className={styles.notifBadge}>
            3
          </span>
        </button>


        {/* PERFIL */}
        <button
          className={styles.avatarBtn}
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

          <ChevronDown
            size={16}
            className={styles.chevron}
          />
        </button>

      </div>

    </header>
  );
};