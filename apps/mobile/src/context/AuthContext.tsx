// import React, { createContext, useEffect, useMemo, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage"; //npx expo install @react-native-async-storage/async-storage desde mobile

// type AuthContextType = {
//     userToken: string | null;
//     isLoading: boolean;
//     signIn: (credentials: { email: string; password: string}) => Promise<void>;
//     signOut: () => Promise<void>;
//     signUp: (data: { email: string; password: string}) => Promise<void>;
// }
// export const AuthContext = createContext<AuthContextType>({
//     userToken: null,
//     isLoading: true,
//     signIn: async () => {},
//     signOut: async () => {},
//     signUp: async () => {}
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [ userToken, setUserToken ] = useState<string | null>(null);
//     const [ isLoading, setIsLoading ] = useState(true);

//     useEffect(() => {
//         const restoreToken = async () => {
//             try {
//                 const token = await AsyncStorage.getItem("userToken");
//                 setUserToken(token);
//             } catch (e) {
//                 console.warn("Failed to load token", e);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         restoreToken();
//     }, []);

//     const authContext = useMemo(() =>({
//         userToken, 
//         isLoading,
//         signIn: async ({ email, password }: { email: string; password:string}) => {
//             console.log("AuthProvider.signIn called with: ", email, password);
//             if ( email !== "test@gmail.com" || password !== "1234") {
//                 throw new Error("Credenciales incorrectas!");
//             }

//             const fakeToken = "fake-token-123";
//             await AsyncStorage.setItem("userToken", fakeToken);
//             setUserToken(fakeToken);
//         },
//         signOut: async () => {
//             await AsyncStorage.removeItem("userToken");
//             setUserToken(null);
//         },
//         signUp: async ({ email, password }: { email: string; password: string }) => {
//             const fakeToken = "fake-token-123";
//             await AsyncStorage.setItem("userToken", fakeToken);
//             setUserToken(fakeToken);
//         }
//     }), [userToken, isLoading]);

//     return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
// };