import { BadRequestError, ConflictError } from "../errors/domain-errors";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../models/employee";
import { EmployeeRepository } from "../repositories/employee-repository";

const employeeRepo = new EmployeeRepository();

export class EmployeeService {
    async createEmployee(data: CreateEmployeeDTO) {
        const existingEmployee = await employeeRepo.findByCPF(data.cpf);

        if (existingEmployee) {
            throw new ConflictError("CPF já cadastrado para outro funcionário");
        }

        if (data.salary < 0) {
            throw new BadRequestError("O salário deve ser um número positivo");
        }

        const result = await employeeRepo.create(data);

        if (!result.insertId) {
            throw new BadRequestError("Erro ao criar funcionário");
        }

        return result;
    }

    async getAllEmployees() {
        return await employeeRepo.findAll();
    }

    async getEmployeeById(id: number) {
        const employee = await employeeRepo.findById(id);

        if (!employee) {
            throw new Error("Funcionário não encontrado");
        }

        return employee;
    }

    async getEmployeeByCPF(cpf: string) {
        const employee = await employeeRepo.findByCPF(cpf);

        if (!employee) {
            throw new Error("Funcionário não encontrado");
        }

        return employee;
    }

    async updateEmployee(id: number, data: UpdateEmployeeDTO) {
        const existingEmployee = await employeeRepo.findById(id);

        if (!existingEmployee) {
            throw new Error("Funcionário não encontrado");
        }

        return await employeeRepo.update(id, data);
    }

    async deleteEmployee(id: number) {
        const employee = await employeeRepo.findById(id);

        if (!employee) {
            throw new Error("Funcionário não encontrado");
        }

        return await employeeRepo.delete(id);
    }
}