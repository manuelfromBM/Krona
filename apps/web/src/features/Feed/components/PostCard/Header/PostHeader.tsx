import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import styles from "../PostCard.module.css";
import type { Post } from "../../../types/post.types";
import { PostMenu } from "./PostMenu";

interface PostHeaderProps {
  post: Post;
  following: boolean;
  onToggleFollow: () => void;
}

export function PostHeader({ post, following, onToggleFollow }: PostHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={`${styles.avatar} ${!following ? styles.hasStory : ""}`}>
        {post.user.avatar ? (
          <Image src={post.user.avatar} alt={post.user.username} fill style={{ objectFit: "cover" }} />
        ) : (
          <span>{post.user.initials}</span>
        )}
      </div>

      <div className={styles.meta}>
        <strong>
          {post.user.username}
          {post.user.verified && <CheckCircle2 size={13} className={styles.verified} />}
        </strong>
        <span>{post.createdAt}{post.isSuggestion && " · Sugerencia"}</span>
      </div>

      <button type="button" className={styles.followBtn} onClick={onToggleFollow}>
        {following ? "Siguiendo" : "Seguir"}
      </button>
      <PostMenu postId={post.id} username={post.user.username} />
    </div>
  );
}
