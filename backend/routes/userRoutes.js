import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { isAuth, isVendedor, generateToken, baseUrl, mailgun } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/',
  isAuth,
  isVendedor,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/:id',
  isAuth,
  isVendedor,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'Usuario no se pudo Encontrar' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isVendedor: updatedUser.isVendedor,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'Usuario no se pudo Encontrar' });
    }
  })
);

userRouter.post(
  '/forgot-password',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      user.resetToken = token;
      await user.save();

      //reset link
      console.log(`${baseUrl()}/reset-password/${token}`);

      mailgun()
        .messages()
        .send(
          {
            from: 'StockStores <reset@stockstores.com>',
            to: `${user.name} <${user.email}>`,
            subject: `Cambiar Contraseña`,
            html: ` 
             <p>Para cambiar su contraseña, por favor siga el siguiente enlace:</p> 
             <a href="${baseUrl()}/reset-password/${token}"}>Cambiar Contraseña</a>
             `,
          },
          (error, body) => {
            console.log(error);
            console.log(body);
          }
        );
      res.send({ message: 'Revisa tu correo para resetear tu contraseña (Si no lo encuentras, revisa carpeta de Spam).' });
    } else {
      res.status(404).send({ message: 'Usuario no se pudo Encontrar' });
    }
  })
);

userRouter.post(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const user = await User.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Contraseña cambiada exitosamente',
            });
          }
        } else {
          res.status(404).send({ message: 'Usuario no se pudo Encontrar' });
        }
      }
    });
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isVendedor,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isVendedor = Boolean(req.body.isVendedor);
      const updatedUser = await user.save();
      res.send({ message: 'Usuario Actualizado', user: updatedUser });
    } else {
      res.status(404).send({ message: 'Usuario no se pudo Encontrar' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isVendedor,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'vendedor@gmail.com') {
        res.status(400).send({ message: 'No Puede eliminar Usuario Vendedor' });
        return;
      }
      await user.remove();
      res.send({ message: 'Usuario Eliminado' });
    } else {
      res.status(404).send({ message: 'Usuario no se pudo Encontrar' });
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isVendedor: user.isVendedor,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Correo o Contraseña invalidos' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVendedor: user.isVendedor,
      token: generateToken(user),
    });
  })
);

export default userRouter;
