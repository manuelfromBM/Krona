export interface User {
    id?: string;
    username: string;
    avatar?: string;
    initials: string;
    
    verified?: boolean;
    isFollowing?: boolean;
};