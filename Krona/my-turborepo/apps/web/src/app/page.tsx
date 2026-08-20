import MainLayout from "../components/layout/MainLayout/MainLayout";
import { RightPanel } from "../components/layout/RightPanel/RightPanel";

import FeedPage from "../features/Feed/FeedPage";

import { MyAgenda } from "../features/Agenda/components/MyAgenda/MyAgenda";
import { Statistics } from "../features/Statistics/components/Statistics/Statistics";

import { mockAgenda } from "../features/Agenda/mock/mockAgenda";
import { mockStatistics } from "../features/Statistics/mock/mockStatistics";

export default function PagePrincipal() {
  return (
    <MainLayout
      center={<FeedPage />}
      right={
        <RightPanel>
          <MyAgenda appointments={mockAgenda} />

          <Statistics data={mockStatistics} />
        </RightPanel>
      }
    />
  );
}