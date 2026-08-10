import styles from "./MainLayout.module.css";

import Sidebar from "../Sidebar/Sidebar";
import { NavBar } from "../Navbar/NavBar";

interface MainLayoutProps {
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function MainLayout({
  center,
  right,
}: MainLayoutProps) {
  return (
    <div className={styles.container}>

      {/* SIDEBAR */}
      <div className={styles.sidebarArea}>
        <Sidebar />
      </div>

      {/* NAVBAR SUPERIOR */}
      <div className={styles.navbarArea}>
        <NavBar />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className={styles.content}>
        {center}
      </main>

      {/* PANEL DERECHO */}
      <aside className={styles.right}>
        {right}
      </aside>

    </div>
  );
}