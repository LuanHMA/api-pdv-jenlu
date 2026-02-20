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
        const openedCashFlow = await cashFlowRepository.findOpenedCashFlow(employeeId);

        if (!employee) {
            throw new NotFoundError("Funcionário não encontrado");
        }

        if (openingBalance < 0) {
            throw new BadRequestError("O saldo de abertura deve ser um número positivo");
        }

        if (openedCashFlow) {
            throw new BadRequestError("Já existe um fluxo de caixa aberto para este funcionário, por favor feche o fluxo de caixa atual antes de abrir um novo.");
        }

        const result = await cashFlowRepository.openCashFlow({
            employee_id: employeeId,
            opening_balance: openingBalance
        });

        if (!result) {
            throw new BadRequestError("Erro ao abrir fluxo de caixa");
        }

        return result
    }

    async findOpenedCashFlow(employeeId: Employee['id']) {
        const employee = await employeeRepository.findById(employeeId);
        const openedCashFlow = await cashFlowRepository.findOpenedCashFlow(employeeId);

        if (!employee) {
            throw new NotFoundError("Funcionário não encontrado");
        }

        if (!openedCashFlow) {
            throw new BadRequestError("Não existe um fluxo de caixa aberto para este funcionário");
        }

        return openedCashFlow
    }

    async closeCashFlow(employeeId: Employee['id'], physicalBalance: CashFlow['physical_balance']) {
        const employee = await employeeRepository.findById(employeeId);
        const openedCashFlow = await cashFlowRepository.findOpenedCashFlow(employeeId);

        if (!openedCashFlow) {
            throw new BadRequestError("Não existe um fluxo de caixa aberto para este funcionário");
        }

        if (!employee) {
            throw new NotFoundError("Funcionário não encontrado");
        }

        // Calcular o sytem_balance
        // Enviar os dados para o repositorio

        // O system_balance é o valor que o sistema espera que tenha no caixa, ou seja, o saldo de abertura mais as vendas realizadas. O physical_balance é o valor real contado no caixa no momento do fechamento. A diferença entre os dois pode indicar se houve algum erro ou fraude.

    }
}


