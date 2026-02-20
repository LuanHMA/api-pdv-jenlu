import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "../config/database";
import { Employee } from "../models/employee";
import { CashFlow, CloseCashFlowDTO, OpenCashFlowDTO } from "../models/cash-flow";

export class CashFlowRepository {
    async openCashFlow(data: OpenCashFlowDTO): Promise<CashFlow | null> {
        const [result] = await db.execute<ResultSetHeader>(
            "INSERT INTO cash_flow(employee_id, opening_balance, status) VALUES(?,?,?)", [data.employee_id, data.opening_balance, "open"]
        );

        if (result.insertId) {
            const [cashFlow] = await db.execute<RowDataPacket[]>("SELECT id, open_datetime, opening_balance, status FROM cash_flow WHERE id = ?", [result.insertId])
            return cashFlow[0] as CashFlow
        }

        return null
    }

    async findOpenedCashFlow(employeeId: Employee['id']) {
        const query = `
            SELECT 
                cf.id as id,
                cf.open_datetime,
                cf.opening_balance,
                cf.physical_balance,
                cf.system_balance,
                cf.status,
                e.id as employee_id,
                e.name as employee_name
            FROM cash_flow cf
            JOIN employee e ON cf.employee_id = e.id
            WHERE employee_id = ? AND status = ?
            LIMIT 1
        `

        const [result] = await db.execute<RowDataPacket[]>(query, [employeeId, "open"]);
        return result[0]
    }

    async closeCashFlow(data: CloseCashFlowDTO) {
        const [result] = await db.execute<ResultSetHeader>(
            "UPDATE cash_flow SET close_datetime = ?, physical_balance = ?, status = ?, system_balance = ? WHERE employee_id = ? AND status = ?",
            [data.close_datetime, data.physical_balance, "closed", data.system_balance, data.employee_id, "open"]
        )

        return result
    }
}