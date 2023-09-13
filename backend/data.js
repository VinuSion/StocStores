import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'William',
      email: 'vendedor@gmail.com',
      password: bcrypt.hashSync('1234'),
      isVendedor: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234'),
      isVendedor: false,
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
      description: 'Perfecto para untar en panes, galletas, tostadas y más. Prueba su delicioso sabor y agradable textura.',
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
      description: 'La leche entera Alquería deslactosada es buena fuente de proteína, calcio y super cremosa.',
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
      description: 'Disfruta de la bebida refrescante Coca Cola litro y medio.',
    },
    {
      name: 'Harina PAN maíz blanco x1000g',
      slug: 'harina-maiz-pan',
      category: 'Viveres',
      image: '/images/pro4.webp',
      price: 3400,
      countInStock: 10,
      brand: 'P.A.N.',
      rating: 4.5,
      numReviews: 3,
      description: 'Harina P.A.N. es un producto único hecho a base de puro maíz, que permite la preparación de deliciosos y variados platos propios de cada cultura, disfrútala en todas sus presentaciones, Blanca, Amarilla y Dulce.',
    },
  ],
};
export default data;
