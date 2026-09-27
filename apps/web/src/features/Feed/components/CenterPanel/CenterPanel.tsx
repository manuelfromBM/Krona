import styles from "./CenterPanel.module.css";

import { ServicesHighlight } from "./ServicesHighlight/ServicesHighlight";
import { PromoBanner } from "./PromoBanner/PromoBanner";
import { NearOpportunities } from "./NearOpportunities/NearOpportunities";

import {
  mockServices,
  mockOpportunities,
} from "../../mocks/mockCenterPanel";

export const CenterPanel = () => {
  return (
    <aside className={styles.panel}>

      <ServicesHighlight
        services={mockServices}
      />

      <PromoBanner />

      <NearOpportunities
        opportunities={mockOpportunities}
      />

    </aside>
  );
};