"use client";
import { useState } from "react";
import { Search, MapPin, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export const NavBar = () => {
  const [notifs] = useState(3);

  return (
    <header className={styles.navbar}>

      {/* Buscador */}
      <div className={styles.search}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar servicios o negocios"
        />
      </div>

      {/* Derecha */}
      <div className={styles.right}>

        {/* Ubicación */}
        <button className={styles.location}>
          <MapPin size={14} className={styles.locationPin} />
          <span>Santiago, Chile</span>
        </button>

        {/* Notificaciones */}
        <button className={styles.notifBtn} aria-label="Notificaciones">
          <Bell size={18} />
          {notifs > 0 && (
            <span className={styles.notifBadge}>{notifs}</span>
          )}
        </button>

        {/* Avatar */}
        <button className={styles.avatarBtn}>
          <div className={styles.avatar}>
            {/* Cuando tengas auth real, pon la imagen del usuario */}
            <span>EA</span>
          </div>
          <ChevronDown size={14} className={styles.chevron} />
        </button>

      </div>
    </header>
  );
};

export default  NavBar;