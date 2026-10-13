import MainLayout from "../../../components/layout/MainLayout/MainLayout";
import { RightPanel } from "../../../components/layout/RightPanel/RightPanel";
import { AgendaBusinessPage } from "../../../features/Agenda/components/AgendaBusinessPage/AgendaBusinessPage";
import { AgendaPromoCard } from "../../../features/Agenda/components/AgendaPromoCard/AgendaPromoCard";
import { Statistics } from "../../../features/Statistics/components/Statistics/Statistics";
import { mockStatistics } from "../../../features/Statistics/mock/mockStatistics";

export default function AgendaPymeRoute() {
  return (
    <MainLayout
      center={<AgendaBusinessPage />}
      right={
        <RightPanel>
          <Statistics data={mockStatistics} />
          <AgendaPromoCard
            title="Comparte tu agenda"
            description="Publica tu disponibilidad en el feed para recibir más reservas esta semana."
            ctaLabel="Crear publicación"
            ctaHref="/feed"
          />
        </RightPanel>
      }
    />
  );
}
