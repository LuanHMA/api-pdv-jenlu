// Modelo principal (Reflete a tabela do banco)
export interface Employee {
    id: number;
    name: string;        // Nome completo
    cpf: string;         // CPF (Cadastro de Pessoa Física)
    role: string;        // Cargo
    status_id: number;   // Situação (FK para employee_status)
    hiring_date: string;   // Data de admissão
    salary: number;      // Salário
    password_hashed: string; // Senha criptografada
}

// Para o cadastro (Não enviamos o ID)
export type CreateEmployeeDTO = Omit<Employee, 'id' | 'hiring_date'>;

// Para atualização (ID é obrigatório para identificar, o resto é opcional)
export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO>;