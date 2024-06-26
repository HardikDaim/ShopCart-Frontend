import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ price, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AfFBcL3Dbtfb-g45Krevr2kud__xJerNU6L4exGbossQIDUhUWUvJrLGaUNmtj3g4l-9Frn_sDgBEh5w" }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: price,
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            onSuccess(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;


