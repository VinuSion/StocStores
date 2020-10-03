import React, { useState, useEffect } from 'react';

function PaymentButton(props) {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaymentSdk = async () => {
    await setSdkReady(true);
  }

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'COP',
          value: props.amount
        }
      }
    ]
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

  useEffect(() => {
    if (!window.payment) {
      addPaymentSdk();
    }
    return () => {
      //
    };
  }, []);

  if (!sdkReady) {
    return <div>Cargando...</div>
  }

  return <button className="button full-width" {...props} createOrder={(data, actions) => createOrder(data, actions)}
  onApprove={(data, actions) => onApprove(data, actions)}>Realizar Pago</button>

}

export default PaymentButton;