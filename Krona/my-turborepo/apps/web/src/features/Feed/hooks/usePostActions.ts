"use client";

import { useState } from "react";

interface UsePostActionsOptions {
    initialLiked?: boolean;         //SI LE DA MEGUSTA
    initialSaved?: boolean;         //SI GUARDO EL POST
    initialFollowing?: boolean;     //SI SIGUE AL USUARIO O NEGOCIO
    initialLikes?: number;          //CONTADOR VISIBLE
}

export const UsePostActions = ({
    initialLiked = false,
    initialSaved = false,
    initialFollowing = false,
    initialLikes = 0,

}: UsePostActionsOptions = {}) => {
    const [liked, setLiked] = useState(initialLiked);
    const [saved, setSaved] = useState(initialSaved);
    const [following, setFollowing] = useState(initialFollowing);
    const [likes, setLikes] = useState(initialLikes); 

    const toggleLike = () => {
        setLiked((currentLiked) => {
            setLikes((currentLikes) =>
                currentLiked
                ? Math.max(0, currentLikes - 1)
                : currentLikes + 1
            );

            return !currentLiked;
        });
    };

    const toggleSave = () => {
        setSaved((currentSaved) => !currentSaved);
    };

    const toggleFollow = () => {
        setFollowing((currentFollowing) => !currentFollowing);
    };

    return {
        liked,
        saved,
        following,
        likes,

        toggleLike,
        toggleSave,
        toggleFollow,
    }
}