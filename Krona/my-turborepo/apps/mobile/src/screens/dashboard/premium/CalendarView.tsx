import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Modal, Alert } from "react-native";
import { calendarStyles as styles } from "./CalendarView.styles";
import { useDashboardPremiumCalendarioData } from "@packages/hooks";
import { CalendarioEvento } from "@packages/hooks/src/dashboard/useDashboardPremiumCalendarioData";

interface Props {
  mode: "day" | "week" | "month";
}

export default function CalendarView({ mode }: Props) {
  const {
    currentDate,
    selectedDate,
    monthMatrix,
    weekDays,
    updateEvento,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    getEventosPorDia,
    getEstadoDelDia,

    getIngresosDelDia,
    getCargaDelDia,
    getPendientesDePago,
    isDiaAbierto,
    setSelectedDate,
    //formatDate,
    //NUEVO CODIGO
    puedeEditarPrecio,
    puedeEditarMetodoPago,
    modoReagendar,
  } = useDashboardPremiumCalendarioData();

  const [modoEdicion, setModoEdicion] = useState(false);
  const [eventoEditado, setEventoEditado] =
  useState<CalendarioEvento | null>(null);


  /* ===========================
      Agregando el estado modal
      CONTROLA SI EL MODAL ESTA
          ABIERTO O CERRADO
   =========================== */
  const [eventoSeleccionado, setEventoSeleccionado] =
    React.useState<CalendarioEvento | null>(null);

  /* ===========================
      Helpers sin dayjs
   =========================== */

  // CONVERTIMOS HORA POR MINITOS
  const toMinutes = (hora: string) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  // LOGICA PARA EVITAR LAS CONFUCIONES
  const hayConflictoHorario = (
    eventoEditado: CalendarioEvento,
    eventosDelDia: CalendarioEvento[]
    
  ) => {
    const inicioNuevo = toMinutes(eventoEditado.horaInicio);
    const finNuevo = inicioNuevo + eventoEditado.duracion;

    return eventosDelDia.some((evento) => {
      // IGNORA EL MISMO EVENTO CUANDO EDITAMOS
      if (evento.id === eventoEditado.id) return false;

      const inicioExistente = toMinutes(evento.horaInicio);
      const finExistente = inicioExistente + evento.duracion;

      return (
        inicioNuevo < finExistente &&
        finNuevo > inicioExistente
      );
    });
  };

  const [hayConflicto, setHayConflicto] = useState(false);

  React.useEffect(() => {
    if (!eventoEditado) return;
    const eventosDelDia = getEventosPorDia(selectedDate);

    const conflicto = hayConflictoHorario(
      eventoEditado,
      eventosDelDia
    );
    setHayConflicto(conflicto);
  }, [eventoEditado]);

  // LISTA DE HORAS DISPONIBLES
  const horasDelDia = Array.from({ length: 12 }, (_, i) => {
    const h = i + 9;
    return `${h.toString().padStart(2, "0")}:00`;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-CL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  const isSameDay = (d1: Date, d2: Date) =>
    d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10);

  const isToday = (date: Date) => isSameDay(date, new Date());

  const isSelected = (date: Date) => isSameDay(date, selectedDate);

  const cargaColor: Record<string, string> = {
    libre: "#E5E7EB",
    medio: "#60A5FA",
    lleno: "#FCA5A5",
  };

  const colorByStatus: Record<string, string> = {
    cancelado: "#FF4D4D",
    confirmado: "#FACC15",
    reagendado: "#FB923C",
    agendado: "#4ADE80",
  };

  /* ==========================================================
     =====================  VISTA MES  ========================
     ========================================================== */
  if (mode === "month") {

    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
            <Text>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>
            {currentDate.toLocaleDateString("es-CL", {
              month: "long",
              year: "numeric",
            })}
          </Text>

          <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* DÍAS SEMANA */}
        <View style={styles.weekRow}>
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
            <Text key={d} style={styles.weekLabel}>
              {d}
            </Text>
          ))}
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {monthMatrix.map((day, i) => {
            if (!day) return <View key={i} style={styles.emptyDay} />;
          
            const estado = getEstadoDelDia(day);
            const carga = getCargaDelDia(day);
            const eventos = getEventosPorDia(day);
          
            const bgColor =
              estado === "cancelado"
                ? "#FEE2E2"
                : estado === "reagendado"
                ? "#FFEDD5"
                : estado === "confirmado"
                ? "#FEF9C3"
                : eventos.length > 0
                ? "#DCFCE7"
                : "#FFFFFF";
          
            return (
              <Pressable
                key={i}
                onPress={() => setSelectedDate(day)}
                style={[
                  styles.dayBox,
                  isToday(day) && styles.todayBox,
                  isSelected(day) && styles.selected,
                  { backgroundColor: bgColor },
                ]}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    isSelected(day) && styles.selectedText,
                  ]}
                >
                  {day.getDate()}
                </Text>
                
                {/* BARRA DE CARGA */}
                {eventos.length > 0 && (
                  <View
                    style={[
                      styles.monthLoadBar,
                      carga === "libre" && { backgroundColor: "#4ADE80" },
                      carga === "medio" && { backgroundColor: "#FACC15" },
                      carga === "lleno" && { backgroundColor: "#EF4444" },
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  /* ==========================================================
  =====================  VISTA DÍA  ========================
  ========================================================== */
  if (mode === "day") {
    const eventosHoy = getEventosPorDia(selectedDate);
    return (
      <View style={styles.container}>
        <Text style={styles.dayTitle}>
          {selectedDate.toLocaleDateString("es-CL", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </Text>
        
        <View style={styles.timeline}>
          {horasDelDia.map((hora) => {
            {/** REMPLAZAMOS EL FIND POR ESTE CODIGO 
            *   AHORA UN EVENTO DE 90 MINUTOS OCUPA 2 BLOQES
            * NO SE REPITE | SE VE REAL*/}
            const evento = eventosHoy.find((e) => {
              const inicio = toMinutes(e.horaInicio);
              const fin = inicio + e.duracion;
              const horaActual = toMinutes(hora);
            
              return horaActual >= inicio && horaActual < fin;
            });
          
            // EVITA DUPLICAR LAS TARJETAS
            const isInicioEvento = evento && evento.horaInicio === hora;
          
            //  Sin evento
            if (!evento) {
              return (
                <View key={hora} style={styles.timeRow}>
                  <Text style={styles.timeLabel}>{hora}</Text>
                  <View style={styles.emptySlot} />
                </View>
              );
            }
          
            //  Evento pero NO inicio
            if (!isInicioEvento) {
              return (
                <View key={hora} style={styles.timeRow}>
                  <Text style={styles.timeLabel}>{hora}</Text>
                  <View style={{ flex: 1 }} />
                </View>
              );
            }
          
            // Inicio del evento (UNA SOLA TARJETA)
            return (
              <View key={hora} style={styles.timeRow}>
                <Text style={styles.timeLabel}>{hora}</Text>
            
                <Pressable
                  onPress={() => setEventoSeleccionado(evento)}
                  style={[
                    styles.eventCard,
                    {
                      borderLeftColor: colorByStatus[evento.estado],
                      height: evento.duracion * 2.5,

                        //ESTE CIDIGO ME PUEDE SERVIR MAS ADELANTE
                        //CUANDDO QUIERA AJUSTAR TODAS LAS
                        //AGENDAS CAMBIA UN SOLO VALOR
                        //height: evento.duracion * PIXELS_POR_MINUTOS,

                    },
                  ]}
                >
                  <Text style={styles.eventClient}>{evento.cliente}</Text>
                  <Text style={styles.eventService}>{evento.servicio}</Text>
                
                  <View style={styles.eventFooter}>
                    <Text style={styles.eventPrice}>
                      ${evento.precio.toLocaleString("es-CL")}
                    </Text>
                
                    <Text
                      style={[
                        styles.eventStatus,
                        { color: colorByStatus[evento.estado] },
                      ]}
                    >
                      {evento.estado.toUpperCase()}
                    </Text>
                    
                    {evento.pagado && (
                      <Text style={styles.eventPaid}>✓ Pagado</Text>
                    )}
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
        
        {/* ================= MODAL ================= */}
        <Modal
          visible={!!eventoSeleccionado}
          animationType="slide"
          transparent
        >
          {/* OVERLAY */}
          <Pressable
            style={styles.modalOverlay}
            onPress={() => {
              setEventoSeleccionado(null);
              setModoEdicion(false);
            }}
          >
            {/* CONTENIDO */}
            <Pressable
              style={styles.modalContent}
              onPress={() => {}}
            >
              {/* SI NO ESTAMOS EDITANDO INFO + BOTONES */}
              {!modoEdicion && (
                <>
                  <Text style={styles.modalTitle}>
                    {eventoSeleccionado?.cliente}
                  </Text>
              
                  <Text style={styles.modalSubtitle}>
                    {eventoSeleccionado?.horaInicio} · {eventoSeleccionado?.servicio}
                  </Text>
              
                  <Text style={styles.modalPrice}>
                    ${eventoSeleccionado?.precio.toLocaleString("es-CL")}
                  </Text>
              
                  <Text
                    style={[
                      styles.modalStatus,
                      {
                        color:
                          colorByStatus[eventoSeleccionado?.estado ?? "agendado"],
                      },
                    ]}
                  >
                    {eventoSeleccionado?.estado.toUpperCase()}
                  </Text>
                  
                  {/* BOTONES DE ACCIÓN */}
                  <View style={styles.modalActions}>
                    <Pressable
                      style={[styles.actionBtn, styles.editBtn]}
                      onPress={() => {
                        setEventoEditado(eventoSeleccionado);
                        setModoEdicion(true);
                      }}
                    >
                      <Text style={styles.actionText}>✏️ Editar</Text>
                    </Pressable>
                    
                    <Pressable
                      style={[styles.actionBtn, styles.reagendarBtn]}
                      onPress={() => {
                        setEventoEditado(eventoSeleccionado as CalendarioEvento); // aseguramos tipo
                        setModoEdicion(true);
                        //setModoReagendar(true); // activamos solo reagendar
                      }}
                    >
                      <Text style={styles.actionText}>🔁 Reagendar</Text>
                    </Pressable>

                    
                    
                    <Pressable
                      style={[styles.actionBtn, styles.cancelBtn]}
                      onPress={() => console.log("Cancelar evento", eventoSeleccionado?.id)}
                    >
                      <Text style={styles.actionText}>❌ Cancelar</Text>
                    </Pressable>
                    
                    {!eventoSeleccionado?.pagado && (
                      <Pressable
                        style={[styles.actionBtn, styles.payBtn]}
                        onPress={() => console.log("Marcar como pagado", eventoSeleccionado?.id)}
                      >
                        <Text style={styles.actionText}>💵 Marcar pagado</Text>
                      </Pressable>
                    )}
                  </View>
                  
                  {/* BOTÓN CERRAR */}
                  <TouchableOpacity
                    style={styles.modalClose}
                    onPress={() => setEventoSeleccionado(null)}
                  >
                    <Text style={styles.modalCloseText}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* MODO EDICIÓN FORMULARIO */}
              {modoEdicion && eventoEditado && (
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Editar evento</Text>

                  {/* HOLA*/}
                  <Text style={styles.label}>Hora</Text>
                  <View style={styles.hourGrid}>
                    {horasDelDia.map((hora) => {
                      const isSelected = eventoEditado.horaInicio === hora;
                      
                      //MODAL EDITAR HORAS
                      return (
                        <Pressable
                        key={hora}
                        onPress={() => 
                          setEventoEditado({
                            ...eventoEditado,
                            horaInicio: hora,
                          })
                        }
                        style={[
                          styles.hourSlot,
                          isSelected && styles.hourSlotSelected,
                        ]}
                        >
                          <Text 
                            style={[
                              styles.hourText,
                              isSelected && styles.hourTextSelected,
                            ]}
                          >
                            {hora}
                          </Text>
                        </Pressable>
                      )
                    })}
                    <Text style={styles.label}>Duración</Text>

                    <View style={styles.durationRow}>
                      {[30, 45, 60, 90].map((min) => {
                        const isSelected = eventoEditado.duracion === min;
                      
                        return (
                          <Pressable
                            key={min}
                            onPress={() =>
                              setEventoEditado({
                                ...eventoEditado,
                                duracion: min,
                              })
                            }
                            style={[
                              styles.durationBtn,
                              isSelected && styles.durationSelected,
                            ]}
                          >
                            <Text
                              style={[
                                styles.durationText,
                                isSelected && styles.durationTextSelected,
                              ]}
                            >
                              {min} min
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
     
                  <Text style={styles.label}>Servicio</Text>
                  <Pressable style={styles.input}>
                    <Text>{eventoEditado.servicio}</Text>
                  </Pressable>
              
                  <Text style={styles.label}>Precio</Text>
                  <Pressable style={styles.input}>
                    <Text>${eventoEditado.precio}</Text>
                  </Pressable>

                  {/**MENSAJE DE CONFLICTO Y MUESTRA MENSAJE DE ERROR */}
                  {hayConflicto && (
                    <Text style={styles.errorText}>
                      ⚠️ Este horario se cruza con otra cita
                    </Text>
                  )}
                  <View style={styles.formActions}>
                    <Pressable
                      disabled={hayConflicto}
                      style={[
                        styles.saveBtn,
                        hayConflicto && {opacity: 0.4},
                      ]}
                      onPress={() =>{
                        if (!eventoEditado) return;
                        try {
                            // actualiza el evento al estado global osea BACKEND
                            updateEvento(eventoEditado);

                            //MENSAJE DE EXITO
                            Alert.alert(
                              "Datos guardados",
                              "Los cambios del evento se guardaron correctamente"
                            );

                            // Cierra el modal
                            setModoEdicion(false);
                            setEventoSeleccionado(null);
                          } catch (error) {
                            
                            //Mensaje de error
                            Alert.alert(
                              "Datos no guardados",
                              "Ocurrio un error al guardar los cambios"
                            );
                          }
                      }}
                    >
                      <Text style={styles.saveText}>Guardar</Text>
                    </Pressable>
                    
                    <Pressable
                      style={styles.cancelEditBtn}
                      onPress={() => setModoEdicion(false)}
                    >
                      <Text>Cancelar</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Pressable>
          </Pressable>
        </Modal>


        {/* =============== FIN MODAL =============== */}
      </View>
    );
  }

  /* ==========================================================
     =====================  VISTA SEMANA  =====================
     ========================================================== */
  if (mode === "week") {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousWeek} style={styles.arrowButton}>
            <Text>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>
            Semana del {weekDays[0].getDate()} al {weekDays[6].getDate()}
          </Text>

          <TouchableOpacity onPress={goToNextWeek} style={styles.arrowButton}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* SEMANA */}
        <View style={styles.weekGrid}>
          {weekDays.map((day, i) => {
            const carga = getCargaDelDia(day);
            const ingresos = getIngresosDelDia(day);
            const pendientes = getPendientesDePago(day);

            return (
              <Pressable
                key={i}
                onPress={() => setSelectedDate(day)}
                style={[
                  styles.weekCard,
                  isSelected(day) && styles.selected,
                ]}
              >
                <Text style={styles.weekDayLabel}>
                  {day.toLocaleDateString("es-CL", { weekday: "short" }).toUpperCase()}
                </Text>

                <Text style={styles.weekDayNumber}>{day.getDate()}</Text>

                {/* CARGA */}
                <View
                  style={[
                    styles.loadIndicator,
                    carga === "libre" && { backgroundColor: "#4ADE80" },
                    carga === "medio" && { backgroundColor: "#FACC15" },
                    carga === "lleno" && { backgroundColor: "#EF4444" },
                  ]}
                />

                <Text style={styles.weekMoney}>
                  ${ingresos.toLocaleString("es-CL")}
                </Text>

                {pendientes > 0 && (
                  <Text style={styles.weekPending}>
                    {pendientes} pendiente{pendientes > 1 ? "s" : ""}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }
}
