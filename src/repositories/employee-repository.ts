import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../config/database';
import { CreateEmployeeDTO, Employee, UpdateEmployeeDTO } from '../models/employee';

export class EmployeeRepository {
    async create(employee: CreateEmployeeDTO) {
        const query = `
            INSERT INTO employee (name, cpf, role, status_id, salary)
            VALUES (?, ?, ?, ?, ?)
        `

        const [result] = await db.execute<ResultSetHeader>(query, [
            employee.name,
            employee.cpf,
            employee.role,
            employee.status_id,
            employee.salary
        ]);

        return result
    }

    async findAll(): Promise<Employee[]> {
        const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM employee');
        return rows as Employee[];
    }

    async findById(id: Employee['id']): Promise<Employee | null> {
        const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM employee WHERE id = ?', [id]);
        const employees = rows as Employee[];
        return employees.length > 0 ? employees[0] : null;
    }

    async findByCPF(cpf: Employee['cpf']): Promise<Employee | null> {
        const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM employee WHERE cpf = ?', [cpf]);
        const employees = rows as Employee[];
        return employees.length > 0 ? employees[0] : null;
    }

    async update(id: Employee['id'], employee: UpdateEmployeeDTO) {
        const fields = Object.keys(employee).map(key => `${key} = ?`).join(', ');
        const values = Object.values(employee);
        const query = `UPDATE employee SET ${fields} WHERE id = ?`;

        const [result] = await db.execute<ResultSetHeader>(query, [...values, id]);
        return result
    }

    async delete(id: Employee['id']) {
        const query = 'DELETE FROM employee WHERE id = ?';
        const [result] = await db.execute<ResultSetHeader>(query, [id]);
        return result
    }
}