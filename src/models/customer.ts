export interface Customer {
    id: number;
    name: string;          // Nome ou Razão Social
    cpf?: string;          // CPF (opcional para consumidor final)
    phone?: string;        // Contato
    loyalty_points: number; // Pontos do programa de fidelidade
}

export type CreateCustomerDTO = Omit<Customer, 'id' | 'loyalty_points'>;

export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;