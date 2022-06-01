import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Cart, User } from '../models/models';

const SECRET_KEY = 'this is secret key';

const userLoginAndRegister = async (fastify, opts) => {
  fastify.post('/registration', async (request, reply) => {
    const { username, email, password, role } = request.body;
    // console.log(await User.findOne({ where: { email } })); need Null

    if (await User.findOne({ where: { email } })) {
      return reply
        .status(400)
        .send({ info: 'Email already exist', name: 'email' });
    } else {
      const user = await User.create({
        username,
        role,
        email,
        password: await hash(password, 10),
      });
      const cart = await Cart.create({ userId: user.id });
      await cart.save(); //
      await user.save();
      return reply.send({ info: 'Success' });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.status(404).send({ info: 'User not found', name: 'email' });
    } else if (user && (await compare(password, user.password))) {
      return reply.send({
        token: await sign(
          { email, id: user.id, username: user.username },
          SECRET_KEY,
          {
            expiresIn: '24h',
          }
        ),
        email: user.email,
        username: user.username,
      });
    } else {
      return reply
        .status(403)
        .send({ info: 'Incorrect Password', name: 'password' });
    }
  });

  fastify.get('/get', (request, reply) => {
    return reply.send({ hello: 'Hello' });
  });
};

export default userLoginAndRegister;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWFAZGltYS5kaW1hIiwiaWQiOjEsImlhdCI6MTY1Mzk4OTQ1MiwiZXhwIjoxNjU0MDc1ODUyfQ.ojRNTQIbpDkZADtzvTDG50ASgf8bceJCMfPuon0tEm0
