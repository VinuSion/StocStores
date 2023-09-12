import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Vendedor',
      email: 'vendedor@gmail.com',
      password: bcrypt.hashSync('1234'),
      isVendedor: true,
    },
  ],
  products: [
    {
      name: 'Queso Crema Colanta x 230g',
      slug: 'queso-crema-colanta',
      category: 'Productos Lacteos',
      image: '/images/pro1.webp',
      price: 2500,
      countInStock: 10,
      brand: 'Colanta',
      rating: 4.5,
      numReviews: 10,
      description: 'Queso crema para untar.',
    },
    {
      name: 'Leche Entera Alqueria x 1100ml Megalitro',
      slug: 'lecha-entera-alqueria',
      category: 'Productos Lacteos',
      image: '/images/pro2.webp',
      price: 3000,
      countInStock: 0,
      brand: 'Alqueria',
      rating: 4.7,
      numReviews: 24,
      description: 'leche entera liquida deslactosada.',
    },
    {
      name: 'Bebida gaseosa Coca Cola original x 1.5l',
      slug: 'gaseosa-coca-cola',
      category: 'Bebidas',
      image: '/images/pro3.webp',
      price: 2000,
      countInStock: 15,
      brand: 'Coca Cola',
      rating: 4.0,
      numReviews: 14,
      description: 'bebida refrescante coca cola litro y medio.',
    },
  ],
};
export default data;
