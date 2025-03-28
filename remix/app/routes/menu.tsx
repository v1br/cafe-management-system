import Navbar from "~/components/shared/navbar";
import drinks from "~/data/drinks.json";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "@remix-run/react";

// Define the Drink type
interface Drink {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  size: string[];
  calories: { [key: string]: number };
  image_url: string;
  quantity?: number; // Optional for cart logic
}

export default function Menu() {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Explicitly set the type for searchTerm
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>(drinks); // Define state type
  const [searchParams] = useSearchParams();

  // Apply search filter when the page loads or the searchTerm changes
  useEffect(() => {
    const query = searchParams.get("search")?.toLowerCase() || "";
    setSearchTerm(query);
    if (query) {
      setFilteredDrinks(
        drinks.filter((drink) =>
          drink.name.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredDrinks(drinks);
    }
  }, [searchParams]);

  // Add drink to cart with quantity handling
  const handleAddToCart = (drink: Drink) => {
    const cart: Drink[] = JSON.parse(localStorage.getItem("cart") || "[]"); // Explicitly set type for cart
    const existingDrink = cart.find((item: Drink) => item.id === drink.id);

    if (existingDrink) {
      existingDrink.quantity = (existingDrink.quantity || 0) + 1; // Increment quantity if drink already exists
    } else {
      cart.push({ ...drink, quantity: 1 }); // Add new drink with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    alert(`${drink.name} has been added to your cart!`); // Optional feedback to user
  };

  return (
    <>
      <Navbar />
      <main className="w-3/4 h-full m-auto">
        <h1 className="text-3xl font-bold my-8">Available Drinks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredDrinks.map((drink: Drink) => (
            <div
              key={drink.id}
              className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full h-32 px-4"
            >
              {/* Image */}
              <img
                src={drink.image_url}
                alt={drink.name}
                className="w-24 h-24 object-cover flex-shrink-0 mr-4 rounded-md"
              />
              {/* Content */}
              <div className="flex-grow">
                <h2 className="text-sm font-bold line-clamp-2">{drink.name}</h2>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {drink.description}
                </p>
                <div className="flex flex-row justify-between items-center my-2">
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    ₹{drink.price}
                  </p>
                  {/* Cart Button */}
                  <button
                    className="bg-[#40312A] text-white text-xs p-2 rounded-md font-medium hover:bg-[#5a4739]"
                    onClick={() => handleAddToCart(drink)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
