import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CashFlowService } from "../services/cash-flow-service";
import { UnauthorizedError } from "../errors/domain-errors";

export class CashFlowController {
    async openCashFlow(req: FastifyRequest, reply: FastifyReply) {
        const employeeId = req.userId

        if (!employeeId) {
            throw new UnauthorizedError("ID do funcionário não encontrado no token de autenticação")
        }

        const openCashFlowSchema = z.object({
            opening_balance: z
                .number("O saldo de abertura é obrigatório e deve ser um número")
                .positive("O saldo de abertura deve ser um número positivo"),
        });

        const { opening_balance } = openCashFlowSchema.parse(req.body);

        const cashFlowService = new CashFlowService()

        const cashFlow = await cashFlowService.openCashFlow(employeeId, opening_balance)

        reply.status(201).send({
            message: "Caixa aberto com sucesso",
            status: 201,
            success: true,
            data: cashFlow
        });
    }

    async findOpenedCashFlow(req: FastifyRequest, reply: FastifyReply) {
        const employeeId = req.userId

        if (!employeeId) {
            throw new UnauthorizedError("ID do funcionário não encontrado no token de autenticação")
        }

        const cashFlowService = new CashFlowService()

        const openedCashFlow = await cashFlowService.findOpenedCashFlow(employeeId)

        reply.status(200).send(openedCashFlow);
    }
} 