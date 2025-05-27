import Button from './Button';

export default function Meals({ meals, isLoading }) {
  const dollarPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <main id="meals">
      {!isLoading &&
        // meals.length > 0 &&
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
                  <Button displayText="Add to Cart" />
                </p>
              </article>
            </li>
          );
        })}
    </main>
  );
}
