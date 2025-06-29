import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/food-cart-context';
import Modal from './Modal';
import Cart from './Cart';
import Button from './Button';
import Checkout from './Checkout';

export default function Header() {
  const {
    items,
    cartModalIsOpen,
    handleOpenCart,
    handleCloseCart,
    checkoutModalIsOpen,
    handleOpenCheckout,
    handleCloseCheckout,
  } = useContext(CartContext);

  let cartModalActions = (
    <button className="text-button" onClick={handleCloseCart}>
      Close
    </button>
  );

  const checkoutModalActions = (
    <div className="modal-actions">
      <button className="text-button" onClick={handleCloseCheckout}>
        Close
      </button>
      <Button type="submit" displayText="Submit Order" />
    </div>
  );

  if (items.length > 0) {
    cartModalActions = (
      <div className="modal-actions">
        <button className="text-button" onClick={handleCloseCart}>
          Close
        </button>
        <Button displayText="Go to Checkout" onClick={handleOpenCheckout} />
      </div>
    );
  }
  return (
    <>
      <Modal
        open={cartModalIsOpen}
        title="Your Cart"
        actions={cartModalActions}
        onClose={handleCloseCart}
      >
        <Cart />
      </Modal>
      <Modal
        open={checkoutModalIsOpen}
        title="Checkout"
        actions={checkoutModalActions}
        onClose={handleCloseCheckout}
      >
        <Checkout />
      </Modal>
      <header id="main-header">
        <h1 id="title">
          <img src={logo} />
          ReactFood
        </h1>
        <button onClick={handleOpenCart} className="text-button">
          {items.length > 0 ? 'Cart(' + items.length + ')' : 'Cart'}
        </button>
      </header>
    </>
  );
}
