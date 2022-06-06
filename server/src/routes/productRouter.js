import { v4 as uuidv4 } from 'uuid';
import { Product, ProductInfo } from '../models/models';
import { checkRole } from './authCheck';
//
const fs = require('fs');
//
export const product = async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    checkRole(request, reply, 'ADMIN');

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

        if (info) {
          // надо парсить в обьект, тк с формдаты приходит строка
          // await не ставим чтобы не блокировать поток
          info = JSON.parse(info);
          info.forEach((item) => {
            ProductInfo.create({
              title: item.title,
              description: item.description,
              productId: product.id,
              // продукт айди создается шагом выше в product
            });
          });
        }
        return reply.send(product);
      }
    } catch (error) {
      return reply.status(403).send({ info: 'error' });
    }
  });

  fastify.get('/', async (request, reply) => {
    let { brandId, typeId, limit, page } = request.query;
    // Limit and Page отображение кол-ва товара на странице
    // и кол-во страниц + товаров
    page = page || 1; // кол-во страниц или 1
    limit = limit || 9; // кол-во товара или 9 (отображаем)
    let offset = page * limit - limit; //отступ , если перешли на следующую страницу, 9 товаров нужно пропустить
    let products;

    if (!brandId && !typeId) {
      products = await Product.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      products = await Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      products = await Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      products = await Product.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return reply.send(products);
  });
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    const product = await Product.findOne({
      where: { id },
      // инсклюд это массив характеристик(должен включатся)
      include: [{ model: ProductInfo, as: 'info' }],
    });
    return reply.send(product);
  });
};
