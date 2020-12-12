import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth/helper';
import { cartEmpty, loadCart } from './CartHelper';
import { Link } from 'react-router-dom';
import StripCheckoutButton from 'react-stripe-checkout';
import logo from '../../logo.png';
import { API, STPKEY } from '../../backend';
import { createOrder } from './orderHelper';

const StripCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const orderData = {
          products: products,
          transcation_id: response.id,
          amount: response.transcation.amount,
        };
        createOrder(userId, token, orderData);
        cartEmpty(() => {
          console.log('crashing...');
        });
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripCheckoutButton
        stripeKey={STPKEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Happy Shoping.."
        image={logo}
        shippingAddress
        billingAddress
      >
        <h4>
          {' '}
          Your Bill Amount is $ {getFinalAmount()}
          only{' '}
        </h4>{' '}
        <button className="btn btn-primary rounded-pill">
          Pay with Stripe{' '}
        </button>{' '}
      </StripCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning rounded-pill"> Signin </button>{' '}
      </Link>
    );
  };

  return <div> {showStripeButton()} </div>;
};
export default StripCheckout;
