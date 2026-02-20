import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { FastifyReply, FastifyRequest } from "fastify";
import { compareToken } from "../utils/jwt";
import { UnauthorizedError } from "../errors/domain-errors";

declare module "fastify" {
    export interface FastifyRequest {
        userId?: number
    }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const { authorization } = request.headers

    if (!authorization) {
        throw new UnauthorizedError("Token de autenticação não fornecido");
    }

    const token = authorization.replace("Bearer ", "");

    if (!token) {
        throw new UnauthorizedError("Token de autenticação não segue o formato Bearer");
    }

    const { id } = compareToken(token)

    if (!id) {
        throw new UnauthorizedError("Token de autenticação inválido");
    }

    request.userId = id
}