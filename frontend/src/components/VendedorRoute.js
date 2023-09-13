import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function VendedorRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isVendedor ? children : <Navigate to="/signin" />;
}
