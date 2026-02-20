export interface Supplier {
    id: number;
    company_name: string; // Razão Social
    trade_name?: string;  // Nome Fantasia
    cnpj: string;         // CNPJ da empresa fornecedora
    phone?: string;
    email?: string;
}

export type CreateSupplierDTO = Omit<Supplier, 'id'>;

export type UpdateSupplierDTO = Partial<CreateSupplierDTO>;