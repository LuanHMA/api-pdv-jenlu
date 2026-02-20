import { FastifyInstance } from 'fastify';
import { EmployeeController } from '../controllers/employee-controller';
import { authMiddleware } from '../middleware/auth-middleware';

export async function employeeRoutes(route: FastifyInstance) {
    const controller = new EmployeeController();

    route.addHook('preHandler', authMiddleware)
    route.post('/', controller.createEmployee);
}