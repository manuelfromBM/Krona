import styles from "./MainLayout.module.css";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/NavBar";

interface MainLayoutProps {
  center: React.ReactNode;
  right?: React.ReactNode;
}

export default function MainLayout({ center, right }: MainLayoutProps) {
  const withoutRightPanel = right === null || right === undefined;

  return (
    <div
      className={
        withoutRightPanel
          ? styles.containerWithoutRight
          : styles.container
      }
    >
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <header className={styles.navbar}>
        <Navbar />
      </header>

      <main className={styles.content}>
        {center}
      </main>

      {!withoutRightPanel && (
        <aside className={styles.right}>
          {right}
        </aside>
      )}
    </div>
  );
}