export interface Sale {
    id: number;
    sale_datetime: Date;      // Data e hora do cupom
    employee_id: number;      // Operador de caixa (FK)
    customer_id?: number;     // Cliente identificado (FK - opcional)
    cash_flow_id: number;     // ID do turno de caixa (FK)
    payment_method: 'cash' | 'credit_card' | 'debit_card' | 'pix'; // Meio de pagamento
    total_amount: number;     // Valor total final
}

// Estrutura enviada pelo PDV ao finalizar uma venda
export interface CreateSaleDTO extends Omit<Sale, 'id' | 'sale_datetime' | 'total_amount'> {
    // Itens que compõem a venda
    items: Array<{
        product_id: number;
        quantity: number;
    }>;
}