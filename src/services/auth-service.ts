import { BadRequestError, NotFoundError } from "../errors/domain-errors";
import { Employee } from "../models/employee";
import { generateToken } from "../utils/jwt";
import { EmployeeService } from "./employee-service";
import bcrypt from "bcrypt";

export class AuthService {
    async login(cpf: Employee['cpf'], password: Employee['password_hashed']) {
        const employeeService = new EmployeeService()
        const employee = await employeeService.getEmployeeByCPF(cpf)

        const isValidPassword = await bcrypt.compare(password, employee.password_hashed)

        if (!isValidPassword) {
            throw new BadRequestError("Credenciais inválidas")
        }

        const token = generateToken(employee.id)

        if (!token) {
            throw new BadRequestError("Erro ao gerar token de autenticação")
        }

        return { token }
    }
}