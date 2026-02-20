import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UnauthorizedError } from '../errors/domain-errors';

export function generateToken(id: number) {
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "1d" })
}

export function compareToken(token: string) {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };

        return {
            id: decoded.id
        };
    }
    catch (error) {
        throw new UnauthorizedError("Token de autenticação inválido");
    }
}