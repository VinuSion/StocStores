import React from 'react';
function CheckoutSteps(props) {
  return <div className="checkout-steps">
    <div className={props.step1 ? 'active' : ''} >SignIn</div>
    <div className={props.step2 ? 'active' : ''} >Envio</div>
    <div className={props.step3 ? 'active' : ''} >Pago</div>
    <div className={props.step4 ? 'active' : ''} >Solicitud</div>
  </div>
}

export default CheckoutSteps;