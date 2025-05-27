import { useState, useEffect } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import CartContextProvider from './store/food-cart-context';
import { fetchAvailableMeals } from './http';

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);

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
  return (
    <CartContextProvider meals={availableMeals}>
      <Header />
      <Meals meals={availableMeals} isLoading={isFetching} />
    </CartContextProvider>
  );
}

export default App;
