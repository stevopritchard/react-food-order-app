import { useContext } from 'react';
import Input from './Input';
import { CartContext } from '../store/food-cart-context';
import { dollarPrice } from '../util/dollarPrice';

export default function Checkout() {
  const { cartTotal } = useContext(CartContext);
  return (
    <div className="control">
      <p>Total Amount: {dollarPrice.format(cartTotal)}</p>
      <Input label="Full Name" type="text" name="name" />
      <Input label="E-Mail Address" type="email" name="email" />
      <Input label="Street" type="text" name="street" />
      <div className="control-row">
        <Input label="Post Code" type="text" name="postcode" />
        <Input label="City" type="text" name="city" />
      </div>
    </div>
  );
}
