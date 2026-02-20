import { BadRequestError, NotFoundError } from '../errors/domain-errors';
import { CashFlow } from '../models/cash-flow';
import { Employee } from '../models/employee';
import { EmployeeRepository } from '../repositories/employee-repository';
import { CashFlowRepository } from './../repositories/cash-flow-repository';

const cashFlowRepository = new CashFlowRepository();
const employeeRepository = new EmployeeRepository();

export class CashFlowService {

    async openCashFlow(employeeId: Employee['id'], openingBalance: CashFlow['opening_balance']) {
        const employee = await employeeRepository.findById(employeeId);

        if (!employee) {
            throw new NotFoundError("Funcionário não encontrado");
        }

        if (openingBalance < 0) {
            throw new BadRequestError("O saldo de abertura deve ser um número positivo");
        }

        

        const result = await cashFlowRepository.openCashFlow(employeeId, openingBalance);

        if (!result.insertId) {
            throw new BadRequestError("Erro ao abrir fluxo de caixa");
        }

        return result
    }
}


