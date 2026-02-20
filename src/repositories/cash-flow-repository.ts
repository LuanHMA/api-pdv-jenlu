import { ResultSetHeader } from "mysql2/promise";
import { db } from "../config/database";
import { Employee } from "../models/employee";
import { CashFlow } from "../models/cash-flow";

export class CashFlowRepository {
    async openCashFlow(employeeId: Employee['id'], openingBalance: CashFlow['opening_balance']) {
        const [result] = await db.execute<ResultSetHeader>(
            "INSERT INTO cash_flow(employee_id, opening_balance, status) VALUES(?,?,?)", [employeeId, openingBalance, "open"]
        );

        return result
    }

    // async closeCashFlow(employeeId: Employee['id'], openingBalance: CashFlow['opening_balance']) {

    // }
}