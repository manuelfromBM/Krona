import { httpClient } from "@/shared/http/httpClient";
import { PROFILE_ENDPOINTS } from "./profile.endpoints";
import { ProfileResponse } from "./profile.types";

export const profileService = {

  getProfile: (token: string, username: string) =>
    httpClient<ProfileResponse>(

        PROFILE_ENDPOINTS.profile.replace(":username", username),
        {
            method: "GET",
            token,
        }
    ),

};