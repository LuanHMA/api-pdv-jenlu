import "dotenv/config";
import fastify from "fastify";
import { employeeRoutes } from "./routes/employee-routes";
import { globalErrorHandler } from "./errors/error-handler";

const app = fastify();
const port = 3000

app.setErrorHandler(globalErrorHandler)

app.get('/', async () => {
    return { status: 'Tudo Rodando!' }
})

app.register(employeeRoutes, {
    prefix: '/api/employees'
})

app.listen({
    port
}).then(() => {
    console.log(`Server is running on port ${port}`);
})