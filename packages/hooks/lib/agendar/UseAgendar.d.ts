import { Platform } from "react-native";
/**
 * Hook personalizado para gestionar la lógica de agendamiento de servicios
 * @returns Objeto con estados y funciones para el agendamiento
 */
export declare const useAgendar: () => {
    navigation: Omit<import("@react-navigation/native").NavigationProp<ReactNavigation.RootParamList>, "getState"> & {
        getState(): import("@react-navigation/native").NavigationState | undefined;
    };
    servicio: string;
    setServicio: import("react").Dispatch<import("react").SetStateAction<string>>;
    fecha: Date;
    mostrarPicker: boolean;
    modo: "date" | "time";
    seleccionarFecha: (event: any, selectedDate?: Date) => void;
    abrirPicker: (mode: "date" | "time") => void;
    handleConfirmar: () => void;
    Platform: Platform;
};
//# sourceMappingURL=UseAgendar.d.ts.map