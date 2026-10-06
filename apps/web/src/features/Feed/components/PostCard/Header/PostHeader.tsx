import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import styles from "../PostCard.module.css";
import type { Post } from "../../../types/post.types";
import { PostMenu } from "./PostMenu";

interface PostHeaderProps {
  post: Post;
  following: boolean;
  onToggleFollow: () => void;
  showFollow?: boolean;
  ownerView?: boolean;
}

export function PostHeader({ post, following, onToggleFollow, showFollow = true, ownerView = false }: PostHeaderProps) {
  return (
    <div className={styles.header}>
      <Link
        href={`/usuarios/${encodeURIComponent(post.user.username)}`}
        className={styles.profileLink}
        aria-label={`Ver perfil de ${post.user.username}`}
      >
        <div className={`${styles.avatar} ${!following ? styles.hasStory : ""}`}>
          {post.user.avatar ? (
            <Image src={post.user.avatar} alt={post.user.username} fill style={{ objectFit: "cover" }} />
          ) : (
            <span>{post.user.initials}</span>
          )}
        </div>
      </Link>

      <div className={styles.meta}>
        <Link
          href={`/usuarios/${encodeURIComponent(post.user.username)}`}
          className={styles.profileNameLink}
        >
          <strong>
            {post.user.username}
            {post.user.verified && <CheckCircle2 size={13} className={styles.verified} />}
          </strong>
        </Link>
        <span>{post.createdAt}{post.isSuggestion && " · Sugerencia"}</span>
      </div>

      {showFollow && (
        <button type="button" className={styles.followBtn} onClick={onToggleFollow}>
          {following ? "Siguiendo" : "Seguir"}
        </button>
      )}
      <PostMenu postId={post.id} username={post.user.username} ownerView={ownerView} />
    </div>
  );
}