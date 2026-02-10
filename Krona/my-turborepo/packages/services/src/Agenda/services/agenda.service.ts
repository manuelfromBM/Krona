import { httpClient } from "../http/httpClient";
import { AxiosResponse } from "axios";

export type CreateDate = {
    date:string;
    time: string;
    userId:string;
    userName: string;
    serviceId: string;
    serviceName: string;
    price: number;
};

export type DateResponse = {
    id: string;
    date: string;
    time: string;
    status: "CONFIRMED" | "PENDING"
};

export const DateService = {
    create(payload: CreateDate): Promise<DateResponse> {
        return httpClient
            .post("/dates", payload)
            .then((res => res.data))
    },
};