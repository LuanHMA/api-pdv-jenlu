import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export class CashFlowController {
    async openCashFlow(req: FastifyRequest, reply: FastifyReply) {
        const employeeId = req.userId

        const openCashFlowSchema = z.object({
            employee_id: z
                .number("O identificador do funcionário é obrigatório e deve ser um número")
                .int("O identificador do funcionário deve ser um número inteiro")
                .positive("O identificador do funcionário deve ser um número positivo"),
            opening_balance: z
                .number("O saldo de abertura é obrigatório e deve ser um número")
                .positive("O saldo de abertura deve ser um número positivo"),
        });
    }
} 