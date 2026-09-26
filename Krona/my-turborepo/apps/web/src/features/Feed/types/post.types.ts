import { User } from "./user.types";
import { Media }from "./media.types";

export interface PostComment {
    id: string;
    username: string;
    avatar: string;
    text: string;
    createdAt: string;
}

export interface Post {
    id: string;
    user: User;
    media: Media;
    likes: number;
    likedBy?: string;
    caption: string;
    commentsCount: number;
    comments?: PostComment[];
    createdAt: string;
    isSuggestion?: boolean;
}
