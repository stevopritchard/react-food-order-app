import { useContext } from 'react';
import { CartContext } from '../store/food-cart-context';
import { dollarPrice } from '../util/dollarPrice';

export default function Cart() {
  const { items, addItemtoCart, removeItemFromCart, cartTotal } =
    useContext(CartContext);

  return (
    <div className="cart">
      <ul>
        {items.map((item) => {
          return (
            <li className="cart-item" key={item.id}>
              <span>
                <p>{item.name + ' - ' + item.quantity + ' x $' + item.price}</p>
              </span>
              <div className="cart-item-actions">
                <button onClick={() => removeItemFromCart(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addItemtoCart(item)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{dollarPrice.format(cartTotal)}</p>
    </div>
  );
}
