import { DataTypes } from 'sequelize';
import sequelize from '../db';

// Наш юсер на регистрацию логин и Админку
export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'USER',
  },
});
// Корзина
export const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
// Продукты в корзине
export const CartProduct = sequelize.define('cart_product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
// Сам продукт (девайс)
export const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Инфо о продукте(девайсе)
export const ProductInfo = sequelize.define('product_info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Тип - имя продукта (название)
export const Type = sequelize.define('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});
//
export const Brand = sequelize.define('brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export const Rating = sequelize.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Бренд продукта// Связующая таблица для бренда и типа
export const TypeBrand = sequelize.define('type_brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
//  Связи с табличками данных
// HAS MANY если одному юсеру(девайсу-табличке) могут принадлежать много устройств
User.hasOne(Cart);
Cart.belongsTo(User);
//
User.hasMany(Rating);
Rating.belongsTo(User);
//
Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);
//
Type.hasMany(Product);
Product.belongsTo(Type);
//
Brand.hasMany(Product);
Product.belongsTo(Brand);
//
Product.hasMany(Rating);
Rating.belongsTo(Product);
//
Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);
//
Product.hasMany(ProductInfo, { as: 'info' });
ProductInfo.belongsTo(Product);
// много ко многим .. для этого создается отдельная промежуточная табличка(бренд-тип)
Type.belongsToMany(Brand, {
  through: TypeBrand,
});
Brand.belongsToMany(Type, {
  through: TypeBrand,
});
