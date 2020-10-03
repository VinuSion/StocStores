import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder, deliverOrder } from '../actions/orderActions';
import PaymentButton from '../components/PaymentButton';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  // For delivery
  const handleSuccessDelivery = (deliveryResult) => {
    dispatch(deliverOrder(order, deliveryResult));
  }


  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Cargando...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Direccion de Envio
          </h3>
            <div>
              {order.shipping.address} - {order.shipping.city},{' '}
              {order.shipping.department}
            </div>
            <div>
              Telefono: +57 {order.shipping.phone}
            </div>
            <div className="big-text">
              {order.isDelivered ? "Enviado En " + order.deliveredAt : "No Enviado"}
            </div>
          </div>
          <div>
            <h3>Pago</h3>
            <div>
              Metodo de Pago: {order.payment.paymentMethod}
            </div>
            <div className="big-text">
              {order.isPaid ? "Pagado En " + order.paidAt : "No se ha Pagado"}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Carrito de Compra
                </h3>
                <div>
                  Precio
                </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    El Carrito esta vacio
                  </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finalizando Pago...</div>}
              {!order.isPaid &&
                <PaymentButton 
                  amount={order.totalPrice}
                  onClick={handleSuccessPayment}/>
              }
            </li>
            <li>
              {order.isPaid && !order.isDelivered ?
                <button
                className="button full-width"
                onClick={handleSuccessDelivery}>Realizar Envio</button>
              : <div className="big-text">Esta Solicitud ya Finalizo</div>}
            </li>
            <li>
              <h3>Resumen de Solicitud</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Costo de Envio</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>IVA</div>
              <div>${order.ivaPrice}</div>
            </li>
            <li>
              <div>Precio Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;