import { useContext } from 'react';
import Button from './Button';
import { CartContext } from '../store/food-cart-context';
import { dollarPrice } from '../util/dollarPrice';

export default function Meals() {
  const { meals, isLoading, addItemtoCart } = useContext(CartContext);

  return (
    <main id="meals">
      {!isLoading &&
        meals.map((meal) => {
          return (
            <li key={meal.id} className="meal-item">
              <article>
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.name}
                />
                <div>
                  <h3>{meal.name}</h3>
                  <div className="meal-item-price">
                    {dollarPrice.format(meal.price)}
                  </div>
                  <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                  <Button
                    displayText="Add to Cart"
                    onClick={() => addItemtoCart(meal)}
                  />
                </p>
              </article>
            </li>
          );
        })}
    </main>
  );
}
