import { Suspense } from "react";
import MainLayout from "../../../components/layout/MainLayout/MainLayout";
import { RightPanel } from "../../../components/layout/RightPanel/RightPanel";
import { AgendaClientPage } from "../../../features/Agenda/components/AgendaClientPage/AgendaClientPage";
import { AgendaPromoCard } from "../../../features/Agenda/components/AgendaPromoCard/AgendaPromoCard";

export default function AgendaClienteRoute() {
  return (
    <Suspense fallback={<p>Cargando agenda...</p>}>
      <MainLayout
        center={<AgendaClientPage />}
        right={
          <RightPanel>
            <AgendaPromoCard
              title="Descubre nuevos servicios"
              description="Explora prestadores cerca de ti y agenda tu próxima cita en segundos."
              ctaLabel="Explorar servicios"
              ctaHref="/feed"
            />
          </RightPanel>
        }
      />
    </Suspense>
  );
}
