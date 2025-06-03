import { useState, useEffect, useReducer, createContext } from 'react';
import { fetchAvailableMeals } from '../http';

export const CartContext = createContext({
  items: [],
  addItemtoCart: () => {},
  updateItemQuantity: () => {},
});

// might still need an analogous function that gets saved order
// async function getMeals() {
//   try {
//     const meals = await fetchAvailableMeals();
//     console.log(meals);
//     return {
//       items: [],
//       availableMeals: meals,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

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
}

export default function CartContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [foodCartState, foodCartDispatch] = useReducer(
    foodCartReducer,
    {
      items: [],
    }
    // getMeals
  );

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

  const contextValue = {
    meals: availableMeals,
    isFetching: isFetching,
    addItemtoCart: addItemToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
