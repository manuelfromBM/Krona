import styles from "./FeedPage.module.css";

import { Stories } from "./components/Stories/Stories";
import PostCard from "./components/PostCard/PostCard";
import { CenterPanel } from "./components/CenterPanel/CenterPanel";

import { mockPosts } from "./mocks/mockPosts";

export default function FeedPage() {
  return (
    <div className={styles.feed}>

      {/* HISTORIAS */}
      <section className={styles.storiesSection}>
        <Stories />
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div className={styles.feedContent}>

        {/* PUBLICACIONES */}
        <section className={styles.postsSection}>
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </section>

        {/* PANEL DE APOYO */}
        <aside className={styles.centerPanel}>
          <CenterPanel />
        </aside>

      </div>

    </div>
  );
}