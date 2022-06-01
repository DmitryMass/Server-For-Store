import fastify from './index';
import db from './db';
import * as models from './models/models';

const start = async () => {
  try {
    await db.authenticate(); // проверка дб в консоле при npm run-e
    await db.sync(); // проверяет состояние бд со схемой данных
    fastify.listen(3002, () => console.log('3002'));
  } catch (err) {
    console.log(err);
  }
};
start();
