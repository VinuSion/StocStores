import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const baseUrl = () => {
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://yourdomain.com';
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVendedor: user.isVendedor,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token Supplied' });
  }
};

export const isVendedor = (req, res, next) => {
  if (req.user && req.user.isVendedor) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Vendedor Token' });
  }
};

export const mailgun = () => {
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });
}

export const payOrderEmailTemplate = (order) => {
  return `<h1>Gracias por Comprar con Nosotros</h1>
  <p>
  Hola ${order.user.name},</p>
  <p>Hemos terminado de procesar su pedido.</p>
  <h2>[Pedido ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Producto</strong></td>
  <td><strong>Cantidad</strong></td>
  <td><strong align="right">Precio</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Precio del Item:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Precio del Domicilio:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Precio Total:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Metodo de Pago:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>

  <h2>Direccion de Envio</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Gracias por comprar en StockStores.
  </p>
  `;
};
