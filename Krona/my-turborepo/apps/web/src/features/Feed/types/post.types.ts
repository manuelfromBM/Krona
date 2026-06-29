import { User } from "./user.types";
import { Media }from "./media.types";

export interface Post {
    id: string;
    user: User;
    media: Media;
    likes: number;
    likedBy?: string;
    caption: string;
    commentsCount: number;
    createdAt: string;
    isSuggestion?: boolean;
}