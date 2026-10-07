"use client";

import { Crosshair, LoaderCircle, MapPin, X } from "lucide-react";

import styles from "./LocationFilter.module.css";
import type { LocationStatus } from "../../hooks/useLocationFilter";

interface LocationFilterProps {
  status: LocationStatus;
  radiusMeters: number;
  onRadiusChange: (meters: number) => void;
  onRequestLocation: () => void;
  onDisableLocation: () => void;
}

const RADIUS_OPTIONS = [500, 1000, 2000, 5000];

export function LocationFilter(props: LocationFilterProps) {
  const enabled = props.status === "ready";

  return (
    <section
      className={`${styles.container} ${enabled ? styles.enabled : ""}`}
      aria-label="Filtro por ubicación"
    >
      <div className={styles.heading}>
        <span className={styles.icon}>
          <MapPin size={17} />
        </span>
        <div>
          <strong>Buscar cerca de mi ubicación</strong>
          <p>
            {enabled
              ? "Ubicación activa. Mostrando negocios dentro del radio elegido."
              : "Activa tu ubicación para encontrar negocios cercanos."}
          </p>
        </div>
      </div>

      {!enabled ? (
        <button
          type="button"
          className={styles.locationButton}
          onClick={props.onRequestLocation}
          disabled={props.status === "loading"}
        >
          {props.status === "loading" ? (
            <LoaderCircle size={16} className={styles.spinner} />
          ) : (
            <Crosshair size={16} />
          )}
          {props.status === "loading"
            ? "Obteniendo ubicación..."
            : "Usar mi ubicación"}
        </button>
      ) : (
        <button
          type="button"
          className={styles.disableButton}
          onClick={props.onDisableLocation}
        >
          <X size={15} /> Quitar ubicación
        </button>
      )}

      {(enabled || props.status === "loading") && (
        <div className={styles.radiusGroup}>
          <span>Distancia máxima</span>
          <div className={styles.radiusOptions}>
            {RADIUS_OPTIONS.map((meters) => (
              <button
                key={meters}
                type="button"
                className={props.radiusMeters === meters ? styles.active : ""}
                onClick={() => props.onRadiusChange(meters)}
              >
                {meters < 1000 ? `${meters} m` : `${meters / 1000} km`}
              </button>
            ))}
          </div>
        </div>
      )}

      {props.status === "denied" && (
        <p className={styles.error}>
          No pudimos acceder a tu ubicación. Revisa el permiso del navegador.
        </p>
      )}
      {props.status === "unsupported" && (
        <p className={styles.error}>
          Este navegador no permite obtener la ubicación.
        </p>
      )}
    </section>
  );
}
