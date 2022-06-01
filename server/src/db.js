import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hekto_store', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

export default sequelize;
