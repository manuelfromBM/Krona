// DashboardPremium.tsx
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { styles } from "./DashboardPremium.styles";
import CalendarView from "./CalendarView";
import { useDashboardPremiumCalendarioData } from "@packages/hooks";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Modal } from "react-native";

export default function DashboardPremium() {
  const { eventos, currentDate } = useDashboardPremiumCalendarioData();
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const screenWidth = Dimensions.get("window").width - 40;

  

  // ==========================
  // FILTRO EVENTOS DEL MES
  // ==========================
  const eventosDelMes = eventos.filter(
    (evento) =>
      evento.fecha.getMonth() === currentDate.getMonth() &&
      evento.fecha.getFullYear() === currentDate.getFullYear()
  );

  // ==========================
  // RESUMEN FINANCIERO
  // ==========================
  const ingresos = eventosDelMes
    .filter((e) => e.estado !== "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);

  const perdidas = eventosDelMes
    .filter((e) => e.estado === "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);

  const ganancias = ingresos - perdidas;
  const totalCitas = eventosDelMes.length;
  const totalCanceladas = eventosDelMes.filter((e) => e.estado === "cancelado").length;


  const totalCobrado = eventosDelMes
    .filter((e) => e.pagado && e.estado !== "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);
  const totalPendiente = ingresos - totalCobrado;
  const metaMensual = 500000;
  const porcentajeMeta = metaMensual > 0 ? (totalCobrado / metaMensual) * 100 : 0;
  const tasaCancelacion = totalCitas > 0 ? (totalCanceladas / totalCitas) * 100 : 0;

  // ==========================
  // OBSERVACIONES Y ALERTAS
  // ==========================
  const observaciones: string[] = [];
  if (totalCitas > 0) {
    if (tasaCancelacion > 30)
      observaciones.push(`Tienes una tasa de cancelación del ${Math.round(tasaCancelacion)}%.`);
    if (totalPendiente > 0)
      observaciones.push(`Tienes $${totalPendiente.toLocaleString("es-CL")} pendientes de pago.`);
    if (porcentajeMeta >= 100) observaciones.push("¡Felicitaciones! Superaste tu meta mensual.");
  }
  if (observaciones.length === 0) observaciones.push("Tu rendimiento mensual es estable.");

  const alertas: string[] = [];
  if (tasaCancelacion > 30) alertas.push("Muchísimas cancelaciones este mes");
  if (totalPendiente > 0) alertas.push("Tienes pagos pendientes");

  
  // ==========================
  // MOCK CLIENTES Y SERVICIOS
  // ==========================
  const clientesFrecuentes = [
    { nombre: "Juan Pérez", citas: 8 },
    { nombre: "Matías Palma", citas: 6 },
    { nombre: "Ariel Vilxes", citas: 4 },
  ];
  const mejoresServicios = [
    { nombre: "Corte de cabello", total: 168000 },
    { nombre: "Barba", total: 54000 },
    { nombre: "Lavado de cabello", total: 32000 },
  ];
  const tendencia = [
    { mes: "Enero", total: 250000 },
    { mes: "Febrero", total: 280000 },
    { mes: "Marzo", total: 320000 },
  ];


  // ==========================
  // TOGGLE GRÁFICO TENDENCIA
  // ==========================
  const [tipoGrafico, setTipoGrafico] = useState<"line" | "pie">("line");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);


  const [userQuestion, setUserQuestion] = useState("");
  const [iaAnswer, setIaAnswer] = useState("");

  const handleAskIA = () => {
    // Por ahora, simulamos respuestas
    if (userQuestion.toLowerCase().includes("cancelación")) {
      setIaAnswer("Recomiendo enviar recordatorios a clientes que hayan cancelado citas previamente.");
    } else if (userQuestion.toLowerCase().includes("meta")) {
      setIaAnswer(`Tu meta mensual es ${metaMensual.toLocaleString("es-CL")}, y llevas cobrado ${totalCobrado.toLocaleString("es-CL")}.`);
    } else {
      setIaAnswer("Gracias por tu pregunta, pronto la IA te dará una recomendación personalizada.");
    }
  };
  

  // ==========================
  // RENDER
  // ==========================
  return (
    <ScrollView style={styles.container } showsVerticalScrollIndicator={false}>
      {/* Impremnetar nombre de la tienda del cliente mas su foto de perfil */}
      <Text style={styles.title}>Dashboard Premium</Text>
      

      {/* Métricas del mes */}
      <View style={styles.metricsContainer}>
        {[
          { label: "Citas", value: totalCitas },
          { label: "Canceladas", value: totalCanceladas },
          { label: "Cobrado", value: `$${totalCobrado.toLocaleString("es-CL")}` },
          { label: "Pendiente", value: `$${totalPendiente.toLocaleString("es-CL")}` },
        ].map((m, i) => (
          <TouchableOpacity
            key={i}
            style={styles.metricCard}
            onPress={() => {
              setSelectedMetric(m.label);
              setShowModal(true);
            }}
          >
            <Text style={styles.metricLabel}>{m.label}</Text>
            <Text style={styles.metricValue}>{m.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs de calendario */}
      <View style={styles.tabsContainer}>
        {["day", "week", "month"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.tab, viewMode === m && styles.tabActive]}
            onPress={() => setViewMode(m as any)}
          >
            <Text style={[styles.tabText, viewMode === m && styles.tabTextActive]}>
              {m === "day" ? "Día" : m === "week" ? "Semana" : "Mes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendario */}
      <CalendarView mode={viewMode} />

      {/* Resumen financiero */}
      <View style={styles.financialCard}>
        <Text style={styles.financialTitle}>💼 Resumen financiero</Text>
        {[
          { label: "Ingresos", value: ingresos, color: "#16A34A" },
          { label: "Pérdidas", value: perdidas, color: "#EF4444" },
        ].map((f, i) => (
          <View key={i} style={styles.financialRow}>
            <Text style={styles.financialLabel}>{f.label}</Text>
            <Text style={{ color: f.color }}>${f.value.toLocaleString("es-CL")}</Text>
          </View>
        ))}
        <View style={styles.financialDivider} />
        <View style={styles.financialRow}>
          <Text style={styles.financialTotalLabel}>Ganancias</Text>
          <Text style={{ color: ganancias >= 0 ? "#16A34A" : "#EF4444" }}>
            ${ganancias.toLocaleString("es-CL")}
          </Text>
        </View>
      </View>

      {/* Observaciones */}
      <View style={styles.observacionesCard}>
        <Text style={styles.observacionesTitle}>🧠 Observaciones automáticas</Text>
        {observaciones.map((obs, i) => (
          <Text key={i} style={styles.observacionItem}>• {obs}</Text>
        ))}
      </View>

      {/* Riesgo financiero */}
      <View style={[styles.card, { backgroundColor: "#F3F4F6", marginTop: 10 }]}>
        <Text style={styles.cardTitle}>⚠️ Riesgo financiero</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color:
              totalPendiente > 100000 ? "#EF4444" :
              totalPendiente > 50000 ? "#F59E0B" :
              "#16A34A",
          }}
        >
          {totalPendiente > 100000 ? "Alto" : totalPendiente > 50000 ? "Medio" : "Bajo"}
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>Basado en pagos pendientes y cancelaciones</Text>
      </View>

      {/* Alertas */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚠️ Alertas del mes</Text>
          {alertas.map((a, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setSelectedMetric(a);
                setShowModal(true);
              }}
            >
              <Text style={styles.item}>• {a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clientes frecuentes */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 Clientes frecuentes</Text>
          {clientesFrecuentes.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.rowBetween}
              onPress={() => console.log("Cliente seleccionado:", c.nombre)}
            >
              <Text>{c.nombre}</Text>
              <Text>{c.citas} citas</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mejores servicios */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Mejores servicios</Text>
          {mejoresServicios.map((s, i) => (
            <TouchableOpacity
              key={i}
              style={styles.rowBetween}
              onPress={() => {
                setSelectedMetric(s.nombre);
                setShowModal(true);
              }}
            >
              <Text>{s.nombre}</Text>
              <Text>${s.total.toLocaleString("es-CL")}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Asistente de IA interactivo */}
        <View style={[styles.card, { backgroundColor: "#E0F2FE", marginTop: 10 }]}>
          <Text style={styles.cardTitle}>🤖 Asistente de IA</Text>

          {/* Consejos automáticos */}
          <View style={{ marginTop: 5 }}>
            {(() => {
              const consejos: string[] = [];
              if (tasaCancelacion > 20)
                consejos.push("Envía recordatorios automáticos para reducir cancelaciones.");
              if (totalPendiente > 50000)
                consejos.push("Ofrece métodos de pago flexibles para agilizar cobros.");
              if (totalCobrado < metaMensual * 0.7)
                consejos.push("Promociona tus servicios más populares para alcanzar la meta.");
              if (clientesFrecuentes.length > 0)
                consejos.push(`Premia a tus clientes frecuentes como ${clientesFrecuentes[0].nombre}.`);
              if (consejos.length === 0)
                consejos.push("Tu desempeño es bueno, sigue así para mantener resultados estables.");
              return consejos.map((c, i) => (
                <Text key={i} style={{ fontSize: 14, marginBottom: 4 }}>• {c}</Text>
              ));
            })()}
          </View>
          
          {/* Chat con IA */}
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Hazle una pregunta a la IA:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#9CA3AF",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  height: 40,
                }}
                placeholder="Escribe tu pregunta..."
                value={userQuestion}
                onChangeText={setUserQuestion}
              />
              <TouchableOpacity
                onPress={handleAskIA}
                style={{ marginLeft: 8, padding: 10, backgroundColor: "#3B82F6", borderRadius: 8 }}
              >
                <Text style={{ color: "#fff" }}>Enviar</Text>
              </TouchableOpacity>
            </View>
              
            {iaAnswer && (
              <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 10, borderRadius: 8 }}>
                <Text style={{ fontSize: 14 }}>{iaAnswer}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Tendencia */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📊 Tendencia</Text>
            <TouchableOpacity onPress={() => setTipoGrafico(tipoGrafico === "line" ? "pie" : "line")}>
              <Text style={{ color: "#3B82F6" }}>{tipoGrafico === "line" ? "Circular" : "Línea"}</Text>
            </TouchableOpacity>
          </View>
          {tipoGrafico === "line" ? (
            <LineChart
              data={{
                labels: tendencia.map((t) => t.mes),
                datasets: [{ data: tendencia.map((t) => t.total) }],
              }}
              width={screenWidth}
              height={220}
              yAxisSuffix="$"
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                propsForDots: { r: "4", strokeWidth: "2", stroke: "#3B82F6" },
              }}
              style={{ borderRadius: 16, marginTop: 10 }}
            />
          ) : (
            <PieChart
              data={tendencia.map((t, i) => ({
                name: t.mes,
                population: t.total,
                color: ["#3B82F6", "#F59E0B", "#16A34A"][i % 3],
                legendFontColor: "#000",
                legendFontSize: 12,
              }))}
              width={screenWidth}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
              style={{ borderRadius: 16, marginTop: 10 }}
            />
          )}
        </View>

        {/* Pagos vs Presupuesto */}
        <View style={[styles.card, { marginTop: 10 }]}>
          <Text style={styles.cardTitle}>💰 Pagos vs Presupuesto</Text>
          <LineChart
            data={{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                { data: [100000, 200000, 350000, totalCobrado], color: () => "#3B82F6" },
                { data: [metaMensual / 4, metaMensual / 4, metaMensual / 4, metaMensual / 4], color: () => "#FBBF24" },
              ],
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
              labelColor: () => "#000",
            }}
            style={{ borderRadius: 16, marginTop: 10 }}
          />
        </View>
      </View>
      
      {/* Modal general */}
      {/* Lo que se puede hacer con este modal es crear una pantalla aparte 
          para que asi pueda ser el codigo mas ordenado
      */}
      {showModal && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles de {selectedMetric}</Text>
              <Text style={styles.modalDescription}>
                Aquí puedes agregar más detalles relacionados con {selectedMetric}.
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      
    </ScrollView>
  );
}