import { httpClient } from "@/shared/http/httpClient";
import { FEED_ENDPOINTS } from "./feed.endpoints";
import { FeedPostDTO, FeedUserDTO, FeedResponse } from "./feed.types";

export const feedService = {
    obtenerFeed: (token: string, cursor?: string) =>
    httpClient<FeedResponse>(cursor?`/feed?cursor=${cursor}`: `/feed`, {
        method: "GET",
        token,
    }),
}