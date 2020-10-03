import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [department, setdepartment] = useState('');
  const [phone, setphone] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, department, phone }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Envio</h2>
          </li>

          <li>
            <label htmlFor="address">
              Direccion
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              Ciudad
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="department">
              Departamento
          </label>
            <input type="text" name="department" id="department" onChange={(e) => setdepartment(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="phone">
              Celular
          </label>
            <input type="text" name="phone" id="phone" onChange={(e) => setphone(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button">Continuar</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;