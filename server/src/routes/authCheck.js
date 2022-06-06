import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from './userRouter';

export default function authMiddleWare(request, reply) {
  if (request.method === 'GET' || 'POST' || 'PUT' || 'DELETE') {
    try {
      const token = request.headers.authorization;
      if (!token) {
        return reply.status(401).json({ message: 'Не авторизован' });
      }
      const decoded = verify(token, SECRET_KEY);
      request.user = decoded;
    } catch (e) {
      reply.status(401).send({ message: 'Ne authorizovan' });
    }
  }
}

export function checkRole(request, reply, role) {
  if (request.method === 'GET' || 'POST' || 'PUT' || 'DELETE') {
    try {
      const token = request.headers.authorization;
      if (!token) {
        return reply.status(401).json({ message: 'Не авторизован' });
      }
      const decoded = verify(token, SECRET_KEY);
      if (decoded.role !== role) {
        return reply.status(403).json({ message: 'Нет доступа' });
      }
      request.user = decoded;
    } catch (e) {
      reply.status(401).send({ message: 'Ne authorizovan' });
    }
  }
}
