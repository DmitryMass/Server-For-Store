import authCheck from './authCheck';
import { brand } from './brandRouter';
import { product } from './productRouter';
import { type } from './typeRouter';
import userLoginAndRegister from './userRouter';

export const allRoutes = async (fastify, opts) => {
  fastify.register(userLoginAndRegister, {
    prefix: '/user',
  });

  fastify.register(product, {
    prefix: '/product',
  });

  fastify.register(brand, {
    prefix: '/brand',
  });

  fastify.register(type, {
    prefix: '/type',
  });
};
