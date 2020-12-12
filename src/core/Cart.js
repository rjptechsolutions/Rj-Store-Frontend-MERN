import React, { useState, useEffect } from 'react';
import '../styles.css';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import StripCheckout from './helper/StripCheckout';
import BrainTreePayment from './BrainTreePayment';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2> This section is to load products </h2>{' '}
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}{' '}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2> This section for checkout </h2>{' '}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {' '}
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3> No Products in Cart </h3>
          )}{' '}
        </div>{' '}
        <div className="col-6">
          <h3 className="text-white"> Select the Payment Method </h3>{' '}
          <StripCheckout products={products} setReload={setReload} />{' '}
          <p className="text-white"> or </p>{' '}
          <BrainTreePayment products={products} setReload={setReload} />
        </div>{' '}
      </div>{' '}
    </Base>
  );
};

export default Cart;
