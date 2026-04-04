import { profileService } from "./profile.service";
import { httpClient } from "../shared/http/httpClient";
import { PROFILE_ENDPOINTS } from "./profile.endpoints";

jest.mock("../shared/http/httpClient", () => ({
    httpClient: jest.fn(),
}));

describe("profileService", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getProfile should call httpClient", async () => {

    const fakeToken = "token-123";
    const username = "ariel_vilxes";

    const mockResponse = {
        profile: {
        id: "1",
        fullName: "Matias Palma",
        username: "ariel_vilxes",
        avatar: "avatar.jpg",
        followers: 18,
        following: 19,
        posts: 30
      }
    };

    (httpClient as jest.Mock).mockResolvedValue(mockResponse);

    const result = await profileService.getProfile(fakeToken, username);

    expect(httpClient).toHaveBeenCalledWith(

        PROFILE_ENDPOINTS.profile.replace(":username", username),
        {
            method: "GET",
            token: fakeToken,
        }
    );

    expect(result).toEqual(mockResponse);
  });

  test("getProfile should handle error", async () => {

    const fakeToken = "token-123";
    const username = "ariel_vilxes";

    (httpClient as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(
        profileService.getProfile(fakeToken, username)
    ).rejects.toThrow("API Error");

  });

});