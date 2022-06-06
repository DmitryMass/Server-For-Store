import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Cart, User } from '../models/models';
import authMiddleWare from './authCheck';

export const SECRET_KEY = 'this is secret key';
const jwtToken = (id, email, role) => {
  return sign(
    {
      id,
      email,
      role,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
};

const userLoginAndRegister = async (fastify, opts) => {
  fastify.post('/registration', async (request, reply) => {
    const { email, password, role } = request.body;
    console.log(await User.findOne({ where: { email } }));

    if (await User.findOne({ where: { email } })) {
      return reply
        .status(400)
        .send({ info: 'Email already exist', name: 'email' });
    } else {
      const user = await User.create({
        email,
        role,
        password: await hash(password, 10),
      });
      const cart = await Cart.create({ userId: user.id });
      const token = jwtToken(user.id, user.email, user.role);

      return reply.send({ token });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.status(404).send({ info: 'User not found', name: 'email' });
    } else if (user && (await compare(password, user.password))) {
      const token = jwtToken(user.id, user.email, user.role);
      return reply.send({ token });
    } else {
      return reply
        .status(403)
        .send({ info: 'Incorrect Password', name: 'password' });
    }
  });

  fastify.get('/auth', async (request, reply) => {
    authMiddleWare(request, reply);
    const token = jwtToken(
      request.user.id,
      request.user.email,
      request.user.role
    ); // не обязательно думаю
    // console.log(request.body, request.method, request.headers.authorization);
    return reply.send({ message: 'This is token' });
  });
};

export default userLoginAndRegister;
