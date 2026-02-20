import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "../config/database";
import { CreateSaleDTO, Sale, UpdateSaleDTO } from "../models/sale";

export class SaleRepository {
    async create(saleData: CreateSaleDTO): Promise<Sale | null> {
        const [result] = await db.execute<ResultSetHeader>(
            "INSERT INTO sale (employee_id, cash_flow_id, status) VALUES (?, ?, ?)", [saleData.employee_id, saleData.cash_flow_id, "opened"]
        );

        if (result.insertId) {
            const [rows] = await db.execute<RowDataPacket[]>(
                "SELECT * FROM sale WHERE id = ?", [result.insertId]
            );
            return rows[0] as Sale;
        }

        return null;
    }

    async update(id: Sale['id'], employee: UpdateSaleDTO) {
        const fields = Object.keys(employee).map(key => `${key} = ?`).join(', ');
        const values = Object.values(employee);
        const query = `UPDATE sale SET ${fields} WHERE id = ?`;

        const [result] = await db.execute<ResultSetHeader>(query, [...values, id]);
        return result
    }

    async findById(id: Sale['id']): Promise<Sale | null> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM sale WHERE id = ?", [id]
        );

        return rows[0] as Sale || null;
    }

    async findOpenedByEmployeeId(employee_id: number): Promise<Sale | null> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM sale WHERE employee_id = ? AND status = 'opened' LIMIT 1", [employee_id]
        );
        return rows[0] as Sale
    }
}