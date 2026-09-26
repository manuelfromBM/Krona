import styles from "./FreeList.module.css";
import PostCard from "../PostCard/PostCard";
import { mockPosts } from "../../mocks/mockPosts";

export const FreeList = () => {

    return (
        <section className={styles.list}>
            {mockPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </section>
    );
};