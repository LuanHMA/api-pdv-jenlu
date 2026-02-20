import { BadRequestError, NotFoundError } from '../errors/domain-errors';
import { CreateSaleDTO, Sale, UpdateSaleDTO } from '../models/sale';
import { CashFlowRepository } from '../repositories/cash-flow-repository';
import { EmployeeRepository } from '../repositories/employee-repository';
import { SaleRepository } from './../repositories/sale-repository';

const saleRepository = new SaleRepository();
const employeeRepository = new EmployeeRepository();
const cashFlowRepository = new CashFlowRepository();

export class SaleService {
    async create({ cash_flow_id, employee_id }: CreateSaleDTO) {
        // Regras: Um funcionário só pode ter uma venda aberta por vez, e para criar uma venda o funcionário deve ter um fluxo de caixa aberto.

        const employee = await employeeRepository.findById(employee_id);
        const hasOpenedCashFlow = await cashFlowRepository.findOpened(employee_id);
        const hasOpenedSale = await saleRepository.findOpenedByEmployeeId(employee_id);

        if (!employee) {
            throw new NotFoundError("Funcionário não encontrado");
        }

        if (!hasOpenedCashFlow) {
            throw new NotFoundError("O fluxo de caixa ainda nao foi aberto para este funcionário");
        }

        if(hasOpenedSale) {
            throw new BadRequestError("Já existe uma venda aberta para este fluxo de caixa");
        }

        const sale = await saleRepository.create({ cash_flow_id, employee_id });

        if (!sale) {
            throw new BadRequestError("Não foi possível criar a venda");
        }

        return sale
    }

    async updateEmployee(id: Sale['id'], data: UpdateSaleDTO) {
        const existingEmployee = await saleRepository.findById(id);

        if (!existingEmployee) {
            throw new NotFoundError("Funcionário não encontrado");
        }

        if (existingEmployee.customer_id) {
            throw new BadRequestError("Não é possível alterar o cliiente de uma venda já associada a um cliente");
        }

        return await saleRepository.update(id, data);
    }
}