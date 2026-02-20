import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { AuthService } from "../services/auth-service";

export class AuthController {
    async login(req: FastifyRequest, reply: FastifyReply) {
        const loginSchema = z.object({
            cpf: z
                .string()
                .regex(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/, "Formato de CPF inválido")
                .transform((val) => val.replace(/\D/g, ""))
                .refine((val) => val.length === 11, "O CPF deve ter 11 dígitos"),
            password: z
                .string("A senha é obrigatória e deve ser uma string")
                .min(6, "A senha deve ter no mínimo 6 caracteres")
                .max(255, "Número de caracteres inválido para a senha"),
        });

        const { cpf, password } = loginSchema.parse(req.body);
        const authService = new AuthService()

        const { token } = await authService.login(cpf, password);

        reply.status(200).send({
            message: "Login realizado com sucesso",
            status: 200,
            success: true,
            token
        });
    }
}