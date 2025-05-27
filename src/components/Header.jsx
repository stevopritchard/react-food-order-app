import { useRef } from 'react';
import CartModal from './CartModal';
import logo from '../assets/logo.jpg';

export default function Header() {
  const modal = useRef();

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button className="text-button">Close</button>;

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <h1 id="title">
          <img src={logo} />
          ReactFood
        </h1>
        <button onClick={handleOpenCartClick} className="text-button">
          Cart
        </button>
      </header>
    </>
  );
}
