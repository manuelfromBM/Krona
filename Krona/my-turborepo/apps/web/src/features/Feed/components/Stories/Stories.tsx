"use client"
import styles from "./Stories.module.css";
import { useState } from "react";
import Image from "next/image";
import StoryModal from "./StoryModal/StoryModal";
import { mockStories } from "../../mocks/mockStories";
import type { Story } from "../../types/story.types";
import { useCallback } from "react";
import { hostname } from "os";

export const Stories = () => {
    const [Stories, setStories] = useState<Story[]>(mockStories);
    const [selected, setSelected] = useState<number | null>(null);

    function openStory(idx: number) {
        setSelected(idx);
    }

    function closeStory() {
        setSelected(null);
    }

    const markSeen = useCallback(( id: string) => {
        setStories(prev =>
            prev.map(story =>
                story.id === id
                ? {...story, seen: true }
                : story
            )
        );
    }, []);


    return (
        <>
            <div className={styles.bar}>

                {Stories.map((story, idx) => (

                    <button
                        key={story.id}
                        className={styles.item}
                        onClick={() => openStory(idx)}
                        aria-label={`Ver historia de ${story.username}`}
                    >
                        <div className={`${styles.ring} ${story.seen ? styles.seen : ""}`}>
                            <div className={styles.avatar}>

                                {story.avatar
                                    ? <Image 
                                        src={story.avatar} 
                                        alt={story.username}
                                        fill style={{objectFit:"cover"}} 
                                    ></Image>

                                    : <span>{story.initials}</span>   
                                }
                            </div>
                            <span className={styles.title}>{story.username}</span>
                        </div>

                    </button>
                ))}
            </div>

            {selected !== null && (
                <StoryModal
                    stories={Stories}
                    initialIndex={selected}
                    onClose={closeStory}
                    onSeen={markSeen}
                />
            )}
        </>
    );
};