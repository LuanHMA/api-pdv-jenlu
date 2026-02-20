import { FastifyInstance } from 'fastify';
import { EmployeeController } from '../controllers/employee-controller';

export async function employeeRoutes(fastify: FastifyInstance) {
    const controller = new EmployeeController();

    fastify.post('/', controller.createEmployee);
}