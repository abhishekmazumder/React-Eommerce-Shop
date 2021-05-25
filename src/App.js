import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

import { Products, NavBar } from './components';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, qty) => {
		const item = await commerce.cart.add(productId, qty);
		setCart(item.cart);
	};
	console.log(cart);
	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<div>
			<NavBar totalItems={cart.total_items} />
			<Products products={products} onAddToCart={handleAddToCart} />
		</div>
	);
};

export default App;
