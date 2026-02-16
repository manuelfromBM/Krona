jest.mock("@/shared/http/httpClient");

import { login } from "@/Login";
import { httpClient } from "@/shared/http/httpClient";

describe("LoginService", () => {
  it("should login successfully", async () => {
    (httpClient.post as jest.Mock).mockResolvedValue({
      data: {
        token: "fake-token",
        user: {
          id: "1",
          email: "test@test.com",
          name: "Test User",
        },
      },
    });

    const result = await login({
      email: "test@test.com",
      password: "123456",
    });

    expect(result).toEqual({
      token: "fake-token",
      user: {
        id: "1",
        email: "test@test.com",
        name: "Test User",
      },
    });
  });

  it("should throw when api fails", async () => {
    (httpClient.post as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials")
    );

    await expect(
      login({
        email: "test@test.com",
        password: "wrong-password",
      })
    ).rejects.toThrow("Invalid credentials");
  });
});
