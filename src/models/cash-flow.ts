export interface CashFlow {
    id: number;
    employee_id: number;       // ID do funcionário (quem abriu)
    open_datetime: Date;       // Data/Hora de abertura
    opening_balance: number;   // Valor inicial de troco (Fundo de caixa)
    close_datetime?: Date;     // Data/Hora de fechamento
    system_balance?: number;   // Saldo esperado pelo sistema
    physical_balance?: number; // Saldo real contado pelo operador
    status: 'open' | 'closed'; // Estado do caixa
}

// Abertura de caixa
export type OpenCashFlowDTO = Pick<CashFlow, 'employee_id' | 'opening_balance'>;

// Fechamento de caixa
export type CloseCashFlowDTO = Pick<CashFlow, 'physical_balance' | "employee_id" | "close_datetime" | "system_balance">;