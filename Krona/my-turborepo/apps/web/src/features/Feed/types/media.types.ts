import { MediaType } from "../constats/media.constants";

export interface Media {
    type: MediaType;
    urls:  string[];
    duration?: string;
}