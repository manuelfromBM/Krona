"use client"
import styles from "./FeedPage.module.css";

import { getFeed } from "./services/feed.service";
import type { FeedPostResponse } from "./services/feed.service"
import type { Post } from "./types/post.types";

import { useEffect, useState } from "react"

import { Stories } from "./components/Stories/Stories";
import PostCard from "./components/PostCard/PostCard";

import { CenterPanel } from "./components/CenterPanel/CenterPanel";

function mapFeedPostToPost(post: FeedPostResponse): Post {
    return {
        id: post.id,
        user: {
            id: post.user.id,
            username: post.user.username,
            initials: post.user.initials,
        },
        media: post.media,
        likes: post.likes,
        caption: post.caption,
        commentsCount: post.commentsCount,
        createdAt: post.createdAt,
    };
}

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFeed() {
            console.log("1. Iniciando carga del feed")
            try {
                const response = await getFeed();
                console.log("2. Respuesta recibida", response)
                setPosts(response.posts.map(mapFeedPostToPost));
            } catch (err) {
                console.error("3. Error al cargar el feed", err)
                setError("No se puede cargar el feed")
            } finally {
                console.log("4. Finalizando carga")
                setLoading(false)
            }
        }

        loadFeed();
    }, []);

    return (
        <div className={styles.feed}>
            <section className={styles.stories}>
                <Stories/>
            </section>

            <div className={styles.content}>
                <section className={styles.posts}>
                    {loading ? (
                        <p>cargando publicaciones...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    )}
                </section>

                <aside className={styles.centerPanel}>
                    <CenterPanel/>
                </aside>
            </div>
        </div>
    );
}
