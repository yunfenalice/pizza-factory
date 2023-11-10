import { effect, signal } from '@preact/signals-react';

export const cartStorage = signal(getCart()); //export it so other components can use it

function getCart() {
  const value = localStorage.getItem('cart');
  if (value === null) return [];
  return JSON.parse(value);
}
effect(() => {
  localStorage.setItem('cart', JSON.stringify(cartStorage.value));
});
