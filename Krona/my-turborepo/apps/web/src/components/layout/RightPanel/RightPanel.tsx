import styles from "./RightPanel.module.css";

interface RightPanelProps {
  children: React.ReactNode;
}

export const RightPanel = ({ children, }: RightPanelProps) => {
  return (
    <div className={styles.panel}>
      {children}
    </div>
  );
};