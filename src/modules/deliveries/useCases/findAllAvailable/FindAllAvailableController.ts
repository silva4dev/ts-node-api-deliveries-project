import { FindAllAvailableUseCase } from './FindAllAvailableUseCase';
import { Request, Response } from "express";

export class FindAllAvailableController {
    async handle(request: Request, response: Response) {
        const findAllAvailableUseCase = new FindAllAvailableUseCase();

        const deliveries = await findAllAvailableUseCase.execute();

        return response.json(deliveries);
    }
}