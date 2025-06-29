import { useContext } from 'react';
import Input from './Input';
import { CartContext } from '../store/food-cart-context';
import { dollarPrice } from '../util/dollarPrice';

export default function Checkout() {
  const { cartTotal, customerDetails } = useContext(CartContext);

  return (
    <div className="control">
      <p>Total Amount: {dollarPrice.format(cartTotal)}</p>
      <Input
        label="Full Name"
        type="text"
        name="name"
        defaultValue={customerDetails.name}
      />
      <Input
        label="E-Mail Address"
        type="email"
        name="email"
        defaultValue={customerDetails.email}
      />
      <Input
        label="Street"
        type="text"
        name="street"
        defaultValue={customerDetails.street}
      />
      <div className="control-row">
        <Input
          label="Post Code"
          type="text"
          name="postal-code"
          defaultValue={customerDetails['postal-code']}
        />
        <Input
          label="City"
          type="text"
          name="city"
          defaultValue={customerDetails.city}
        />
      </div>
    </div>
  );
}
