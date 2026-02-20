import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth-controller";

export async function authRoutes(fastify: FastifyInstance) {
    const controller = new AuthController();

    fastify.post('/login', controller.login);
}