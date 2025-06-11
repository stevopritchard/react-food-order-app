import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/food-cart-context';
import Modal from './Modal';
import Cart from './Cart';
import Button from './Button';

export default function Header() {
  const { items, cartModalIsOpen, handleOpenCart, handleCloseCart } =
    useContext(CartContext);

  let modalActions = <button className="text-button">Close</button>;

  if (items.length > 0) {
    modalActions = (
      <>
        <button className="text-button">Close</button>
        <Button displayText="Go to Checkout" onClick={handleCloseCart} />
      </>
    );
  }
  return (
    <>
      <Modal
        open={cartModalIsOpen}
        title="Your Cart"
        actions={modalActions}
        onClose={handleCloseCart}
      >
        <Cart />
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
