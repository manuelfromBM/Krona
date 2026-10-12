"use client";

import styles from "./PostCard.module.css";
import { UsePostActions } from "../../hooks/usePostActions";
import type { Post } from "../../types/post.types";
import { PostHeader } from "./Header/PostHeader";
import { PostMedia } from "./Media/PostMedia";
import { PostActions } from "./Actions/PostActions";
import { CommentsPanel } from "./Comments/CommentsPanel";
import { SharePanel } from "./Share/SharePanel";
import ReservationModal from "./Reservation/ReservationModal";
import { ReservationToast } from "./Reservation/ReservationToast";
import { useComments } from "./hooks/useComments";
import { useReservation } from "./hooks/useReservation";
import { useShare } from "./hooks/useShare";

interface PostCardProps {
  post: Post;
}

// PostCard solo coordina los módulos que componen una publicación.
export default function PostCard({ post }: PostCardProps) {
  const actions = UsePostActions({
    initialLiked: false,
    initialSaved: false,
    initialFollowing: post.user.isFollowing ?? false,
    initialLikes: post.likes,
  });
  const comments = useComments(post.commentsCount);
  const share = useShare();
  const reservation = useReservation();

  const commentsPanelId = `comments-${post.id}`;
  const sharePanelId = `share-${post.id}`;

  return (
    <>
      <article id={`post-${post.id}`} className={styles.card}>
        <PostHeader
          post={post}
          following={actions.following}
          onToggleFollow={actions.toggleFollow}
        />

        <PostMedia post={post} />

        <div className={styles.body}>
          <PostActions
            liked={actions.liked}
            likes={actions.likes}
            saved={actions.saved}
            reserved={reservation.isReserved}
            commentsOpen={comments.isOpen}
            commentsTotal={comments.total}
            commentsPanelId={commentsPanelId}
            shareOpen={share.isOpen}
            sharePanelId={sharePanelId}
            onToggleLike={actions.toggleLike}
            onToggleComments={comments.toggle}
            onToggleShare={share.toggle}
            onToggleSave={actions.toggleSave}
            onReserve={reservation.open}
          />

          {share.isOpen && (
            <SharePanel id={sharePanelId} message={share.message} onSelect={share.selectOption} />
          )}

          {post.likedBy ? (
            <p className={styles.likedBy}>
              Les gusta a <strong>{post.likedBy}</strong> y otras personas
            </p>
          ) : (
            <p className={styles.likedBy}><strong>{actions.likes} me gusta</strong></p>
          )}

          <p className={styles.caption}>
            <strong>{post.user.username}</strong> {post.caption}
          </p>

          {comments.total > 0 && (
            <button
              type="button"
              className={styles.commentsLink}
              onClick={comments.toggle}
              aria-expanded={comments.isOpen}
              aria-controls={commentsPanelId}
            >
              {comments.isOpen ? "Ocultar" : "Ver los"} {comments.total} comentarios
            </button>
          )}

          {comments.isOpen && (
            <CommentsPanel
              id={commentsPanelId}
              initialCount={post.commentsCount}
              initialComments={post.comments}
              comments={comments.comments}
              draft={comments.draft}
              onDraftChange={comments.setDraft}
              onSubmit={comments.submit}
            />
          )}

          <span className={styles.time}>{post.createdAt}</span>
        </div>
      </article>

      {reservation.isOpen && (
        <ReservationModal
          businessName={post.user.username}
          onClose={reservation.close}
          onConfirm={reservation.confirm}
        />
      )}

      {reservation.notice && <ReservationToast message={reservation.notice} />}
    </>
  );
}
