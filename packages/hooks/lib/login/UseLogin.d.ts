export default function useLogin(): {
    email: string;
    setEmail: import("react").Dispatch<import("react").SetStateAction<string>>;
    password: string;
    setPassword: import("react").Dispatch<import("react").SetStateAction<string>>;
    loading: boolean;
    error: string | null;
    handleLogin: () => Promise<void>;
};
//# sourceMappingURL=UseLogin.d.ts.map