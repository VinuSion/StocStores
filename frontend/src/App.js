import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">StocStores</Link>
          </div>
          <div className="header-links">
          <Link to="/cart">Carrito</Link>
            {userInfo && userInfo.isVendedor && (
              <div className="dropdown">
                <a href="#">Vendedor</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Solicitudes</Link>
                    <Link to="/products">Productos</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Categorias</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Aseo">Aseo</Link>
            </li>

            <li>
              <Link to="/category/Bebidas">Bebidas</Link>
            </li>
            
            <li>
              <Link to="/category/Carbohidratos">Carbohidratos: Cereales, Panes, Pasta y Otros Derivados</Link>
            </li>

            <li>
              <Link to="/category/Carnes">Carnes, Pescado y Huevos</Link>
            </li>

            <li>
              <Link to="/category/Frutas">Frutas y Verduras</Link>
            </li>

            <li>
              <Link to="/category/Lacteos">Leche y Productos Lacteos</Link>
            </li>

            <li>
              <Link to="/category/Legumbres">Legumbres</Link>
            </li>

            <li>
              <Link to="/category/sincategoria">Sin Categoria</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          <b>&copy;SENA</b>-<p>Proyecto Productivo "StocStores"</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
