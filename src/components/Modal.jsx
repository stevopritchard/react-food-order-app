import { useEffect, useRef, useActionState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { CartContext } from '../store/food-cart-context';
import { isNotEmpty, isEmail } from '../util/validation';

export default function Modal({ open, title, children, actions, onClose }) {
  const dialog = useRef();

  const { getCustomerDetails, submitOrder } = useContext(CartContext);

  function checkoutAction(prevFormState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const street = formData.get('street');
    const postalCode = formData.get('postal-code');
    const city = formData.get('city');

    let errors = [];

    console.log(name);
    if (name === null || !isNotEmpty(name)) {
      errors.push('Please provide your name.');
    }

    if (email === null || !isEmail(email)) {
      errors.push('Invalid email address.');
    }

    if (street === null || !isNotEmpty(street)) {
      errors.push('Please provide your street address.');
    }

    if (postalCode === null || !isNotEmpty(postalCode)) {
      errors.push('Please provide your postcode.');
    }

    if (city === null || !isNotEmpty(city)) {
      errors.push('Please provide your city of residence.');
    }

    if (errors.length > 0) {
      getCustomerDetails({
        name,
        email,
        street,
        'postal-code': postalCode,
        city,
      });
      return {
        errors,
        enteredValues: {
          name,
          email,
          street,
          'postal-code': postalCode,
          city,
        },
      };
    }

    getCustomerDetails({});
    submitOrder({
      name,
      email,
      street,
      'postal-code': postalCode,
      city,
    });
    return {
      errors: null,
    };
  }

  const [formState, formAction] = useActionState(checkoutAction, {
    errors: null,
  });

  useEffect(() => {
    console.log(formState.enteredValues);
  }, [formState.enteredValues]);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      <h2>{title}</h2>
      <form action={formAction}>
        {open ? children : null}
        {formState.errors && (
          <div className="error">
            <h2>We're missing a few details!</h2>
            <ul>
              {formState.errors.map((error) => {
                return <p key={error}>{error}</p>;
              })}
            </ul>
          </div>
        )}
        {actions}
      </form>
    </dialog>,
    document.body
  );
}
