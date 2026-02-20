import { JsonWebTokenError } from './../../node_modules/@types/jsonwebtoken/index.d';
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { DomainError } from "./domain-errors.js";

export function globalErrorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    let statusCode: number;
    let message: string;
    let details: unknown;

    // Erros de Domínio
    if (error instanceof DomainError) {
        statusCode = error.status;
        message = error.message;
        details = error.details;
        console.log(`[DOMAIN ERROR] ${error.name}: ${error.message}`);
    }

    // Erros de Validação (ZOD)
    else if (error instanceof ZodError) {
        const zodDetails = error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));

        statusCode = 400;
        message = "Dados de entrada inválidos. Verifique os detalhes.";
        details = zodDetails;

        console.log(`[VALIDATION ERROR] Zod: ${JSON.stringify(zodDetails)}`);
    }

    //Outros Erros
    else {
        statusCode = 500;
        message = "Ocorreu um erro interno inesperado no servidor.";
        console.log(`[UNEXPECTED ERROR] ${error}`);
    }

    return reply.status(statusCode).send({ message, details, success: false });
}