import { authService } from "./auth.service";
import { httpClient } from "../shared/http/httpClient";
import { AUTH_ENDPOINTS } from "./auth.endpoints";


jest.mock("../shared/http/httpClient", () => ({
  httpClient: jest.fn(),
}));

describe("authService", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("iniciosesion debe llamar a httpClient con el endpoint y body correctos", async () => {
    const mockData = { email: "test@test.com", password: "123" };
    const mockResponse = { token: "fake-token", user: { id: 1, name: "Admin" } };

    (httpClient as jest.Mock).mockResolvedValue(mockResponse);

    const result = await authService.iniciosesion(mockData);

    expect(httpClient).toHaveBeenCalledWith(AUTH_ENDPOINTS.inicioSesion, {
      method: "POST",
      body: JSON.stringify(mockData),
    });
    
    expect(result).toEqual(mockResponse);
  });

  test("me debe enviar el token en las opciones", async () => {
    const fakeToken = "abc-123";
    (httpClient as jest.Mock).mockResolvedValue({ id: 1 });

    await authService.me(fakeToken);

    expect(httpClient).toHaveBeenCalledWith(AUTH_ENDPOINTS.me, {
      method: "GET",
      token: fakeToken,
    });
  });
});
