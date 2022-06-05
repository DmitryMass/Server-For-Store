import { v4 as uuidv4 } from 'uuid';
import { Product } from '../models/models';
//
const fs = require('fs');
const util = require('util');
const path = require('path');
const { pipeline } = require('stream');
const pump = util.promisify(pipeline);
//
export const product = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    // const data = await req.file()
    // await pump(data.file, fs.createWriteStream(data.filename))
    // try {
    // let { name, price, brandId, typeId, info } = request.body;
    const file = request.body.file;

    if (file) {
      file.filename = uuidv4() + '.jpg';
      fs.createWriteStream(part.file, `src/picture/${file.filename}`);

      // file[0].filename = uuidv4() + '.jpg';
      // console.log(file[0].filename);
      // fs.createWriteStream(`src/picture/${file[0].filename}`);
      // let fileName = uuidv4() + '.jpg';

      // resolve(__dirname, '..', 'picture', fileName);

      // const product = await Product.create({
      //   name,
      //   price,
      //   brandId,
      //   typeId,
      //   img: `${uuidv4()}${img}`,
      // });
      return reply.send({ info: 'img' });
    }
    // } catch (error) {
    return reply.status(403).send({ info: 'error' });
    // }
  });

  fastify.get('/', async (request, reply) => {});
  fastify.get('/:id', async (request, reply) => {});
};
