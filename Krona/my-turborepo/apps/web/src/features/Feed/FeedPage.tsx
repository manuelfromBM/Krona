//import { Navbar }   from "./components/Navbar/Navbar";
//import { Stories }  from "./components/Stories/Stories";
import { FreeList } from "./components/FreeList/FreeList";
import { Stories } from "./components/Stories/Stories";
//import { Footer }   from "./components/Footer/Footer";
import styles from "./FeedPage.module.css";

export const FeedPage = () => {
    return (
        <>
            <div className={styles.layout}>

              {/* Centro — feed principal */}
              <main className={styles.center}>
                <Stories/>
                
                <FreeList />
                
              </main>

              {/* Derecha — sugerencias/publicidad (puedes llenarlo después) */}
              <aside className={styles.right}>
                    {/* <RightPanel /> */}
              </aside>

            </div>
        </>
    );
};

export default FeedPage;