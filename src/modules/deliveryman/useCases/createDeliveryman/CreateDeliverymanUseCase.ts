import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryman) {
        const deliverymanExist = await prisma.deliveryMan.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if (deliverymanExist) {
            throw new Error("Deliveryman already exists");
        }

        const hashPassword = await hash(password, 10);

        const deliveryman = await prisma.deliveryMan.create({
            data: {
                username,
                password: hashPassword
            }
        });

        return deliveryman;
    }
}