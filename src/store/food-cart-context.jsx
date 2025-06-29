import { useState, useEffect, useReducer, createContext } from 'react';
import { fetchAvailableMeals, addToOrder } from '../http';

export const CartContext = createContext({
  items: [],
  isFetching: Boolean,
  addItemtoCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: Number,
  cartModalIsOpen: Boolean,
  handleOpenCart: () => {},
  handleCloseCart: () => {},
  checkoutModalIsOpen: Boolean,
  handleOpenCheckout: () => {},
  handleCloseCheckout: () => {},
  customerDetails: {},
  getCustomerDetails: () => {},
  submitOrder: () => {},
});

function foodCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (orderItem) => orderItem.id === action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      // need to access the quantity of the item on the current order
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (orderItem) => orderItem.id === action.payload.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem.quantity > 1) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.splice(existingCartItemIndex, 1);
    }

    return {
      items: updatedItems,
    };
  }
}

export default function CartContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [foodCartState, foodCartDispatch] = useReducer(foodCartReducer, {
    items: [],
  });
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    async function getMeals() {
      setIsFetching(true);
      try {
        fetchAvailableMeals().then((meals) => {
          setAvailableMeals(meals);
        });
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }
    getMeals();
  }, []);

  useEffect(() => {
    console.log(foodCartState.items);
  }, [foodCartState.items]);

  function addItemToCart(meal) {
    foodCartDispatch({
      type: 'ADD_ITEM',
      payload: meal,
    });
  }

  function removeItemFromCart(meal) {
    foodCartDispatch({
      type: 'REMOVE_ITEM',
      payload: meal,
    });
  }

  function handleOpenCart() {
    setCartModalIsOpen(true);
  }

  function handleCloseCart() {
    setCartModalIsOpen(false);
  }

  function handleOpenCheckout() {
    setCartModalIsOpen(false);
    setCheckoutModalIsOpen(true);
  }

  function handleCloseCheckout() {
    setCheckoutModalIsOpen(false);
  }

  function getCustomerDetails(details) {
    setCustomerDetails({ ...details });
  }

  async function submitOrder(details) {
    const body = {
      order: {
        items: foodCartState.items,
        customer: details,
      },
    };
    console.log(body);
    const response = await addToOrder(body);
    console.log(response);
  }

  useEffect(() => {
    setCartTotal(
      foodCartState.items.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
      }, 0)
    );
  }, [foodCartState.items]);

  const contextValue = {
    meals: availableMeals,
    isFetching: isFetching,
    items: foodCartState.items,
    addItemtoCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
    cartTotal: cartTotal,
    cartModalIsOpen: cartModalIsOpen,
    handleOpenCart: handleOpenCart,
    handleCloseCart: handleCloseCart,
    checkoutModalIsOpen: checkoutModalIsOpen,
    handleOpenCheckout: handleOpenCheckout,
    handleCloseCheckout: handleCloseCheckout,
    customerDetails: customerDetails,
    getCustomerDetails: getCustomerDetails,
    submitOrder: submitOrder,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
