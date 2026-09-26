import styles from "./FeedPage.module.css";

import { Stories } from "./components/Stories/Stories";
import PostCard from "./components/PostCard/PostCard";
import { CenterPanel } from "./components/CenterPanel/CenterPanel";

import { mockPosts } from "./mocks/mockPosts";

export default function FeedPage() {
  return (
    <div className={styles.feed}>
      <section className={styles.stories}>
        <Stories />
      </section>

      <div className={styles.content}>
        <section className={styles.posts}>
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </section>

        <aside className={styles.centerPanel}>
          <CenterPanel />
        </aside>
      </div>
    </div>
  );
}