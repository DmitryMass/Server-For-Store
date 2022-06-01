import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';
import { Product } from '../models/models';
//
// const fs = require('fs')
// const util = require('util')
// const path = require('path')
// const { pipeline } = require('stream')
// const pump = util.promisify(pipeline)
//
export const product = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    // const data = await req.file()
    // await pump(data.file, fs.createWriteStream(data.filename))
    try {
      let { name, price, brandId, typeId, info } = request.body;
      const img = await request.files;
      console.log(img);
      if (img) {
        let fileName = uuidv4() + '.jpg';

        resolve(__dirname, '..', 'picture', fileName);

        const product = await Product.create({
          name,
          price,
          brandId,
          typeId,
          img: `${uuidv4()}${img}`,
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
