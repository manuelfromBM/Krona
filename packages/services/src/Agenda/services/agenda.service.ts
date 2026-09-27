import { httpClient } from "@/shared/http/httpClient";

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
        return httpClient<DateResponse>("/dates", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
};