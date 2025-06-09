import Header from './components/Header';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Cart from './components/Cart';
import CartContextProvider from './store/food-cart-context';
import { useState } from 'react';

function App() {
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);

  function handleOpenCart() {
    setCartModalIsOpen(true);
  }

  let modalActions = <button className="text-button">Close</button>;

  return (
    <CartContextProvider>
      <Modal open={cartModalIsOpen} title="Your Cart" actions={modalActions}>
        <Cart />
      </Modal>
      <Header openCart={handleOpenCart} />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
