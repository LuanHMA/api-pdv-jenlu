import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { SaleService } from "../services/sale-service";
import { UnauthorizedError } from "../errors/domain-errors";

export class SaleController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        const employeeId = req.userId

        if (!employeeId) {
            throw new UnauthorizedError("ID do funcionário não encontrado no token de autenticação")
        }

        const createSaleSchema = z.object({
            cash_flow_id: z
                .number("O identificador do fluxo de caixa é obrigatório e deve ser um número")
                .int("O identificador do fluxo de caixa deve ser um número inteiro")
                .positive("O identificador do fluxo de caixa deve ser um número positivo"),
        })

        const { cash_flow_id } = createSaleSchema.parse(req.body);

        const saleService = new SaleService();

        const sale = await saleService.create({ cash_flow_id, employee_id: employeeId });

        return reply.status(201).send({
            message: "Venda criada com sucesso",
            status: 201,
            success: true,
            sale
        });
    }
}