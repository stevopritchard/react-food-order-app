import { useState, useEffect, useReducer, createContext } from 'react';
import { fetchAvailableMeals } from '../http';

export const CartContext = createContext({
  items: [],
  addItemtoCart: () => {},
  updateItemQuantity: () => {},
});

// function foodCartReducer(state, action) {
//   if (action.type === 'ADD ITEM') {
//     const updateItems = [...state.items];

//     const existingCartItemIndex = updateItems.findIndex(
//       (cartItem) => cartItem.id === action.payload
//     );
//     const existingCartItem = updateItems[existingCartItemIndex];

//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         quantity: existingCartItem.quantity + 1,
//       };
//       updateItems[existingCartItemIndex] = updateItems;
//     } else {
//       // const product =
//     }
//   }
// }

export default function CartContextProvider({ children }) {
  // const [foodCartState, foodCartDispatch] = useReducer(foodCartReducer, {
  //   items: [],
  // });

  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({ items: [] });

  useEffect(() => {
    async function getMeals() {
      setIsFetching(true);
      try {
        const meals = await fetchAvailableMeals();
        setAvailableMeals(meals);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }
    getMeals();
  }, []);

  useEffect(() => {
    console.log(currentOrder);
  }, [currentOrder]);

  function addToOrder(id) {
    // shallow copy of array item
    const menuItem = availableMeals.filter((meal) => meal.id === id)[0];

    // boolean, but need to access the quantity
    // prop on this array item via this same method
    const isOnOrder =
      currentOrder.items.filter((orderItem) => orderItem.id === id).length > 0;

    if (isOnOrder) {
      // need to access the quantity of the item on the current order
      const updatedQuantity = currentOrder.items.map((orderItem) => {
        if (orderItem.id === id) {
          orderItem.quantity += 1;
        }
        return orderItem;
      });
      setCurrentOrder({ items: updatedQuantity });
    } else {
      menuItem.quantity = 1;
      setCurrentOrder({ items: [...currentOrder.items, menuItem] });
    }
  }

  const contextValue = {
    meals: availableMeals,
    isFetching: isFetching,
    addItemtoCart: addToOrder,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
