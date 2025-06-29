export async function fetchAvailableMeals() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  return resData;
}

export async function addToOrder(order) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update order.');
  }

  return resData.message;
}
