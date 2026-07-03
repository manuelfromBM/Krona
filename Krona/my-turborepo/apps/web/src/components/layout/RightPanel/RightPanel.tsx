import styles from "./RightPanel.module.css";
import { UserProfile }  from "../UserProfile/UserProfile";
import { Suggestions }  from "../Suggestions/Suggestions";

import { AdBanner }  from "../AdBanner/AdBanner";

import { PanelFooter }  from "../PanelFooter/PanelFooter";
import { mockSuggestions, mockAd } from "../../../features/Feed/mocks/mockRightPanel";

export const RightPanel = () => {
    return (
        <aside className={styles.panel}>
            <UserProfile />
            <Suggestions suggestions={mockSuggestions} />
            <AdBanner ad={mockAd} />
            <PanelFooter />
        </aside>
    );
};