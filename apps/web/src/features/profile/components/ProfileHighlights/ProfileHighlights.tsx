"use client";

import styles from "../../ProfilePage.module.css";
import { highlights } from "../../mocks/profile.mock";

interface Props {
  visibleHighlights: Record<string, boolean>;
}

export function ProfileHighlights({ visibleHighlights }: Props) {
  return (
    <div className={styles.highlights}>
      {highlights.filter(({ label }) => visibleHighlights[label]).map(({ label, icon: Icon }) => (
        <div className={styles.highlight} key={label}>
          <div className={styles.highlightCircle}><Icon /></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}