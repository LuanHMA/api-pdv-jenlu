import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth-controller";

export async function authRoutes(route: FastifyInstance) {
    const controller = new AuthController();

    route.post('/login', controller.login);
}