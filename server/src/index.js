import Fastify from 'fastify';
import { allRoutes } from './routes';
//
// import fp from 'fastify-plugin';
//

const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

// fastify.register(import('@fastify/autoload'), {
//   dir: join(__dirname, 'routes'),
//   options: Object.assign({}),
// });
// fastify.register(import('@fastify/autoload'), {
//   dir: join(__dirname, 'src'),
//   options: Object.assign({}),
// });

// fp(async(fastify, opts) => {
//   fastify.register(import('@fastify/multipart'), {
//     limits: {
//       fieldNameSize: 100,
//       fields: 20,
//       files: 1,
//     },
//   })
// })

fastify.register(allRoutes, { prefix: '/api' });

fastify.get('/', (request, reply) => {
  return reply.status(200).send({ info: 'Hi' });
});

export default fastify;
