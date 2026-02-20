import { FastifyReply, FastifyRequest } from "fastify";
import { EmployeeService } from "../services/employee-service";
import z from "zod";

const employeeService = new EmployeeService();

export class EmployeeController {
    async createEmployee(request: FastifyRequest, reply: FastifyReply) {
        const employeeSchema = z.object({
            name: z
                .string("O nome é obrigatório e deve ser uma string")
                .min(1, "O nome é obrigatório")
                .max(100, "O nome deve ter no máximo 100 caracteres")
                .trim(),
            cpf: z
                .string()
                .regex(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/, "Formato de CPF inválido")
                .transform((val) => val.replace(/\D/g, ""))
                .refine((val) => val.length === 11, "O CPF deve ter 11 dígitos"),
            role: z
                .enum(["admin", "cashier", "manager"], "Digite um cargo válido: admin, cashier ou manager"),
            status_id: z
                .number("O identificador de status é obrigatório e deve ser um número")
                .int("O identificador de status deve ser um número inteiro")
                .positive("O identificador de status deve ser um número positivo"),
            salary: z
                .number("O salário é obrigatório e deve ser um número")
                .positive("O salário deve ser um número positivo"),
        });

        const employeeData = employeeSchema.parse(request.body);

        await employeeService.createEmployee(employeeData)

        reply.status(201).send({
            message: "Funcionário criado com sucesso",
            status: 201
        });
    }
}