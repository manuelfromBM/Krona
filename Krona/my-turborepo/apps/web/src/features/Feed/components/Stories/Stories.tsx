"use client"
import styles from "./Stories.module.css";
import { useState } from "react";
import Image from "next/image";
import StoryModal from "./StoryModal/StoryModal";
import { mockStories } from "../../mocks/mockStories";
import type { Story } from "../../types/story.types";

export const Stories = () => {
    const [Stories, setStories] = useState<Story[]>(mockStories);
    const [selected, setSelected] = useState<number | null>(null);

    function openStory(idx: number) {
        setSelected(idx);
    }

    function closeStory() {
        setSelected(null);
    }

    function markSeen(id: string) {
        setStories(prev =>
            prev.map(s => s.id === id ? { ...s, seen: true } : s)
        );
    }
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