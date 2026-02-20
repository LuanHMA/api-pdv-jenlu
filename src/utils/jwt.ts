import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function generateToken(id: number) {
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "1d" })
}

export function compareToken(token: string) {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };

    if (!decoded.id) {
        throw new Error("Token inválido")
    }

    return {
        id: decoded.id
    };
}