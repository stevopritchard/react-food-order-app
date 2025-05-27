import { useReducer, createContext } from 'react';

export const CartContext = createContext({
  items: [],
  addItemtoCart: () => {},
  updateItemQuantity: () => {},
});

function foodCartReducer(state, action) {
  if (action.type === 'ADD ITEM') {
    const updateItems = [...state.items];

    const existingCartItemIndex = updateItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updateItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updateItems[existingCartItemIndex] = updateItems;
    } else {
      // const product =
    }
  }
}

export default function CartContextProvider({ children }) {
  const [foodCartState, foodCartDispatch] = useReducer(foodCartReducer, {
    items: [],
  });
  return <CartContext.Provider>{children}</CartContext.Provider>;
}
