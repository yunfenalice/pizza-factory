const API_URL = 'https://react-fast-pizza-api.onrender.com/api';
const ORDER_URL = 'http://127.0.0.1:3000/api/v1/orders';

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

export async function getOrder(id) {
  // const res = await fetch(`${ORDER_URL}/${id}`);
  // if (!res.ok) throw Error(`Couldn't find order #${id}`);

  // const { data } = await res.json();
  console.log('fetching order id', id);
  const data = {
    id: 'ABCDEF',
    customer: 'jonas',
    phone: '131313',
    address: 'Arrios, Lisbon, Portugal',
    priority: true,
    estimatedDelivery: '2027-04-25T10:00:00',
    cart: [
      {
        pizzaId: 7,
        name: 'Napolo',
        quantity: 3,
        unitPrice: 16,
        totalPrice: 48,
      },
      {
        pizzaId: 5,
        name: 'Diavola',
        quantity: 3,
        unitPrice: 15,
        totalPrice: 43,
      },
    ],
    position: '-9.000,38.000',
    orderPrice: 95,
    priorityPrice: 19,
  };
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${ORDER_URL}`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
