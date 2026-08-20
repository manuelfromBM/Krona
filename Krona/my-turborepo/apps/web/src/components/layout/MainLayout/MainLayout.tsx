import styles from "./MainLayout.module.css";

import Sidebar from "../Sidebar/Sidebar";
import Navbar  from "../Navbar/Navbar";

interface MainLayoutProps {
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function MainLayout({ center, right, }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <header className={styles.navbar}>
        <Navbar></Navbar>
      </header>

      <main className={styles.content}>
        {center}
      </main>

      <aside className={styles.right}>
        {right}
      </aside>
    </div>
  );
}