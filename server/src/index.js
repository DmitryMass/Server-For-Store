import Fastify from 'fastify';
import { allRoutes } from './routes';
import { join } from 'path';
//

const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
  preservePath: true,
});
fastify.register(import('@fastify/cookie'));
fastify.register(import('@fastify/static'), {
  root: join(__dirname, 'static'),
});

fastify.register(allRoutes, { prefix: '/api' });

fastify.get('/', (request, reply) => {
  return reply.status(200).send({ info: 'Hi' });
});

export default fastify;
