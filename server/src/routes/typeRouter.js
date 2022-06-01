import { Type } from '../models/models';

export const type = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    const { name } = request.body;

    const type = await Type.create({ name });

    return reply.send(type);
  });

  fastify.get('/', async (request, reply) => {
    const types = await Type.findAll();

    return reply.send(types);
  });
};

// /api/type ...
