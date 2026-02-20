import "dotenv/config";
import fastify from "fastify";
import { employeeRoutes } from "./routes/employee-routes";
import { globalErrorHandler } from "./errors/error-handler";
import { authRoutes } from "./routes/auth-routes";
import { cashFlowRoutes } from "./routes/cash-flow-routes";

const app = fastify();
const port = 3000

app.setErrorHandler(globalErrorHandler)

app.get('/', async () => {
    return { status: 'Tudo Rodando!' }
})

app.register(employeeRoutes, { prefix: '/api/employees' })
app.register(authRoutes, { prefix: '/api/auth' })
app.register(cashFlowRoutes, { prefix: '/api/cash-flow' })

app.listen({
    port
}).then(() => {
    console.log(`Server is running on port ${port}`);
})