import  styles  from "./MainLayout.module.css";


interface MainLayoutProps {
    left: React.ReactNode;
    center: React.ReactNode;
    right: React.ReactNode;
}

export default function MainLayout({ left, center, right, }: MainLayoutProps) {
    return (
        <div className={styles.container}>
            <aside className={styles.left}>
                {left}
            </aside>

            <main className={styles.center}>
                {center}
            </main>

            <aside className={styles.right}>
                {right}
            </aside>

        </div>
    );
}