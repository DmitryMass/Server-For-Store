import { Brand } from '../models/models';
import { checkRole } from './authCheck';

export const brand = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    // проверка чтобы создавал только Администратор
    checkRole(request, reply, 'ADMIN');

    const { name } = request.body;
    const brand = await Brand.create({ name });
    return reply.send(brand);
  });
  fastify.get('/', async (request, reply) => {
    const brands = await Brand.findAll();
    return reply.send(brands);
  });
};

// /api/brand
