export interface Sale {
    id: number;
    sale_datetime: Date;      // Data e hora do cupom
    employee_id: number;      // Operador de caixa (FK)
    customer_id?: number;     // Cliente identificado (FK - opcional)
    cash_flow_id: number;     // ID do turno de caixa (FK)
    payment_method: 'cash' | 'credit_card' | 'debit_card' | 'pix'; // Meio de pagamento
    total_amount: number;     // Valor total final
    status: 'opened' | 'closed' | 'canceled'; // Status da venda
}

// Estrutura enviada pelo PDV ao finalizar uma venda
export interface CreateSaleDTO extends Pick<Sale, "cash_flow_id" | "employee_id"> { }

export interface UpdateSaleDTO extends Pick<Sale, "payment_method" | "status" | "customer_id" | "total_amount"> { }