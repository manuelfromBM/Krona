export declare const useAgregarTarjeta: () => {
    navigation: Omit<import("@react-navigation/native").NavigationProp<ReactNavigation.RootParamList>, "getState"> & {
        getState(): import("@react-navigation/native").NavigationState | undefined;
    };
    paymentType: "credit" | "debit" | "other";
    setPaymentType: import("react").Dispatch<import("react").SetStateAction<"credit" | "debit" | "other">>;
    cardName: string;
    setCardName: import("react").Dispatch<import("react").SetStateAction<string>>;
    cardNumber: string;
    onChangeCardNumber: (text: string) => void;
    expiry: string;
    onChangeExpiry: (text: string) => void;
    cvv: string;
    onChangeCvv: (text: string) => void;
    rut: string;
    onChangeRut: (text: string) => void;
    email: string;
    setEmail: import("react").Dispatch<import("react").SetStateAction<string>>;
    loading: boolean;
    handleGuardar: () => void;
};
//# sourceMappingURL=UseAgregarTarjeta.d.ts.map