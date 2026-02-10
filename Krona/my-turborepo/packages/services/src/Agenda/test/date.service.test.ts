jest.mock("../http/httpClient");

import { DateService } from "../services/agenda.service";
import { httpClient } from "../http/httpClient";

describe("DateService", () => {
    it("should create a date", async () => {
        (httpClient.post as jest.Mock).mockResolvedValue({
            data: {
                id: "1",
                date: "2026-02-15",
                time: "10:30",
                status: "CONFIRMED",
            },
        });

        const result = await DateService.create({
            date: "2026-02-15",
            time: "10:30",
            userId: "123",
            userName: "Manuel",
            serviceId: "srv_01",
            serviceName: "Corte",
            price: 12000,
        });

        expect(result).toEqual({
            id: "1",
            date: "2026-02-15",
            time: "10:30",
            status: "CONFIRMED",
        });
    });
    it("should throw when api fails", async () => {
        (httpClient.post as jest.Mock).mockRejectedValue(
            new Error("Network error")
        );

        await expect(
            DateService.create({} as any)
        ).rejects.toThrow("Network error");
    });
});
