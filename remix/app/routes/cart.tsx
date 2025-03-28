import React, { useState, useEffect } from "react";
import Navbar from "~/components/shared/navbar";

interface Drink {
	id: number;
	name: string;
	description: string;
	category: string;
	price: number;
	size: string[];
	calories: { [key: string]: number };
	image_url: string;
	quantity: number; // Ensures cart items have a quantity
}

export default function Cart() {
	const [cart, setCart] = useState<Drink[]>([]);

	// Load cart data from localStorage
	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCart(storedCart);
	}, []);

	// Update quantity of a drink
	const updateQuantity = (drinkId: number, newQuantity: number) => {
		const updatedCart = cart.map((item) => {
			if (item.id === drinkId) {
				return {
					...item,
					quantity: newQuantity > 0 ? newQuantity : item.quantity,
				};
			}
			return item;
		});
		setCart(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	// Delete a drink from the cart
	const deleteDrink = (drinkId: number) => {
		const updatedCart = cart.filter((item) => item.id !== drinkId);
		setCart(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	// Clear the entire cart
	const clearCart = () => {
		setCart([]);
		localStorage.removeItem("cart");
	};

	// Calculate total price with GST
	const calculateTotalBill = () => {
		const subtotal = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);
		const gst = subtotal * 0.05;
		return (subtotal + gst).toFixed(2);
	};

	return (
		<>
			<Navbar />
			<main className="w-3/4 m-auto">
				<h1 className="text-3xl font-bold my-8">Your Cart</h1>
				{cart.length > 0 ? (
					<>
						{/* Cart Items */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
							{cart.map((item) => (
								<div
									key={item.id}
									className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full h-32 px-4"
								>
									{/* Image */}
									<img
										src={item.image_url}
										alt={item.name}
										className="w-24 h-24 object-cover flex-shrink-0 mr-4 rounded-md"
									/>
									{/* Content */}
									<div className="flex-grow">
										<h2 className="text-sm font-bold">{item.name}</h2>
										<p className="text-sm text-gray-700">₹{item.price}</p>
										<div className="flex items-center my-2">
											<label
												htmlFor={`quantity-${item.id}`}
												className="text-sm font-medium mr-2"
											>
												Quantity:
											</label>
											<input
												type="number"
												value={item.quantity}
												min="1"
												onChange={(e) =>
													updateQuantity(
														item.id,
														Number.parseInt(e.target.value, 10),
													)
												}
												className="bg-gray-100 px-2 py-1 rounded-md w-16"
											/>
											<button
												type="button"
												onClick={() => deleteDrink(item.id)}
												className="ml-4 text-xs text-red-500 font-bold hover:scale-110"
											>
												X
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Total Bill */}
						<div className="mt-8 mx-4 p-4 bg-gray-100 rounded-lg shadow-md">
							<p className="text-lg font-medium">
								Total Bill (including GST): ₹{calculateTotalBill()}
							</p>
							{/* Buttons */}
							<div className="flex gap-4 mt-8">
								<button
									type="button"
									onClick={clearCart}
									className="lg:hidden bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600"
								>
									Clear
								</button>
								<button
									type="button"
									onClick={() =>
										alert(
											"Thank you for placing an order!\n\n{This is a dummy alert, to be redirected to the external payment portal via backend microservice...}",
										)
									} // Dummy alert
									className="lg:hidden bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
								>
									Confirm
								</button>
								<button
									type="button"
									onClick={clearCart}
									className="hidden lg:block bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600"
								>
									Clear Cart
								</button>
								<button
									type="button"
									onClick={() =>
										alert(
											"Thank you for placing an order!\n\n{This is a dummy alert, to be redirected to the external payment portal via backend microservice...}",
										)
									} // Dummy alert
									className="hidden lg:block bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
								>
									Place Order
								</button>
							</div>
						</div>
					</>
				) : (
					<p className="text-lg font-medium">Your cart is empty!</p>
				)}
			</main>
		</>
	);
}
