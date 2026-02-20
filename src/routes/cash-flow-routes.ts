import { FastifyInstance } from "fastify";
import { CashFlowController } from "../controllers/cash-flow-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export async function cashFlowRoutes(route: FastifyInstance) {
    const cashFlowController = new CashFlowController()

    route.addHook("preHandler", authMiddleware)
    route.post("/open", cashFlowController.openCashFlow)
}