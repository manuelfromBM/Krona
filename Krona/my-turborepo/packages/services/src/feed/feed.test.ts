import { feedService } from "./feed.service";
import { httpClient } from "../shared/http/httpClient";
import { FEED_ENDPOINTS } from "./feed.endpoints";

jest.mock("../shared/http/httpClient", () => ({
  httpClient: jest.fn(),
}));

describe("feedService", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("obtenerFeed debe llamar a httpClient sin cursor", async () => {
    const fakeToken = "token-123";

    const mockResponse = {
      posts: [
        {
          id: "1",
          descripcion: "primer post",
          imagen: "img.jpg",
          fecha: "2026-03-12",
          usuario: {
            id: "user1",
            nombre: "Juan",
            avatar: "avatar.jpg"
          },
          likes: 10,
          comentarios: 2
        }
      ],
      nextCursor: "abc123"
    };

    (httpClient as jest.Mock).mockResolvedValue(mockResponse);

    const result = await feedService.obtenerFeed(fakeToken);

    expect(httpClient).toHaveBeenCalledWith(FEED_ENDPOINTS.feed, {
      method: "GET",
      token: fakeToken,
    });

    expect(result).toEqual(mockResponse);
  });


  test("obtenerFeed debe llamar a httpClient con cursor", async () => {
    const fakeToken = "token-123";
    const cursor = "abc123";

    const mockResponse = {
      posts: [],
      nextCursor: "xyz789"
    };

    (httpClient as jest.Mock).mockResolvedValue(mockResponse);

    await feedService.obtenerFeed(fakeToken, cursor);

    expect(httpClient).toHaveBeenCalledWith(
      `${FEED_ENDPOINTS.feed}?cursor=${cursor}`,
      {
        method: "GET",
        token: fakeToken,
      }
    );
  });


  test("obtenerFeed debe retornar los posts del feed", async () => {
    const fakeToken = "token-123";

    const mockResponse = {
      posts: [
        {
          id: "1",
          descripcion: "post test",
          imagen: "test.jpg",
          fecha: "2026-03-12",
          usuario: {
            id: "user1",
            nombre: "Ana",
            avatar: "avatar.jpg"
          },
          likes: 5,
          comentarios: 1
        }
      ]
    };

    (httpClient as jest.Mock).mockResolvedValue(mockResponse);

    const result = await feedService.obtenerFeed(fakeToken);

    expect(result.posts.length).toBe(1);
    expect(result.posts[0].descripcion).toBe("post test");
  });

});