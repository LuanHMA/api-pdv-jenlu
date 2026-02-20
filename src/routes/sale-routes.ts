import { FastifyInstance } from "fastify";
import { SaleController } from "../controllers/sale-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export async function saleRoutes(route: FastifyInstance) {
    const salesController = new SaleController()

    route.addHook("preHandler", authMiddleware)

    route.post("/", salesController.create)
}