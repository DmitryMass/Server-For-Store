import { v4 as uuidv4 } from 'uuid';
import { Product } from '../models/models';
//
const fs = require('fs');
//
export const product = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    const file = request.body.file;

    try {
      let { name, price, brandId, typeId, info } = request.body;

      if (file) {
        // const newFileName = `${uuidv4()}${file[0].filename}`;
        const newFileName = `${uuidv4()}.jpg`;
        // Должен пропускать только 1 файл или по 1
        const imgFile = fs.createWriteStream(`src/static/${newFileName}`);
        imgFile.write(file[0].data);
        const product = await Product.create({
          name,
          price,
          brandId,
          typeId,
          img: newFileName,
        });
        return reply.send(product);
      }
    } catch (error) {
      return reply.status(403).send({ info: 'error' });
    }
  });

  fastify.get('/', async (request, reply) => {});
  fastify.get('/:id', async (request, reply) => {});
};
