import { Brand } from '../models/models';

export const brand = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
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
