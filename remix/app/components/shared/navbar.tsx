import { Link, useLocation, useNavigate } from "@remix-run/react";
import type React from "react";
import { useState } from "react";
import drinks from "../../data/drinks.json";

interface Drink {
	id: number;
	name: string;
	description: string;
	category: string;
	price: number;
	size: string[];
	calories: { [key: string]: number };
	image_url: string;
}

export default function Navbar() {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<Drink[]>([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
	const navigate = useNavigate();
	const location = useLocation();

	// Update suggestions based on input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value.toLowerCase();
		setSearchTerm(query);
		if (query) {
			setSuggestions(
				drinks
					.filter((drink) => drink.name.toLowerCase().includes(query))
					.slice(0, 5), // Limit suggestions to top 5
			);
		} else {
			setSuggestions([]);
		}
	};

	// Handle search query submission
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSuggestions([]);
		navigate(`/menu?search=${searchTerm}`); // Pass query as URL parameter
	};

	// Handle suggestion click
	const handleSuggestionClick = (drinkName: string) => {
		setSearchTerm(drinkName);
		setSuggestions([]);
		navigate(`/menu?search=${drinkName}`); // Pass query as URL parameter
	};

	return (
		<nav className="flex flex-col lg:flex-row items-center w-full py-4 px-6 lg:px-16 justify-between bg-[#FFEFE2] shadow-md relative">
			{/* Left Section */}
			<div className="flex w-full lg:w-fit items-center justify-between lg:justify-start">
				<div className="flex items-center gap-4">
					<img src="icons/Cafe.svg" alt="Logo" className="w-[2em] h-[2em]" />
					<Link to="/" className="text-lg font-bold hover:underline">
						Cafe Management System
					</Link>
				</div>
				{/* Hamburger Menu Button */}
				<button
					type="button"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="lg:hidden flex items-center justify-center w-10 h-10 bg-[#40312A] text-white rounded-md"
				>
					☰
				</button>
			</div>

			{/* Links and Search Bar in Hamburger Menu */}
			<ul
				className={`${
					isMenuOpen ? "flex" : "hidden"
				} flex-col lg:flex lg:flex-row h-fit gap-4 lg:gap-8 items-center mt-4 lg:mt-0 absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#FFEFE2] lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 shadow-lg lg:shadow-none`}
			>
				{/* Search Bar */}
				<li className="lg:hidden w-full">
					<form onSubmit={handleSearchSubmit} className="w-full">
						<input
							type="text"
							placeholder="🔎 Search"
							value={searchTerm}
							onChange={handleInputChange}
							className="w-full bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#40312A]"
						/>
					</form>
				</li>
				<li>
					<Link
						to="/menu"
						className="text-sm lg:text-base font-medium hover:underline"
						onClick={() => setIsMenuOpen(false)} // Close menu on link click
					>
						Menu
					</Link>
				</li>
				<li>
					<Link
						to="/cart"
						className="text-sm lg:text-base font-medium hover:underline"
						onClick={() => setIsMenuOpen(false)} // Close menu on link click
					>
						Cart
					</Link>
				</li>
				<li>
					<Link
						to="/"
						className="text-sm lg:text-base font-medium hover:underline"
						onClick={() => setIsMenuOpen(false)} // Close menu on link click
					>
						About
					</Link>
				</li>
			</ul>

			{/* Search Bar for Larger Screens */}
			<div className="relative hidden lg:block mt-4 lg:mt-0 w-full lg:w-auto">
				<form onSubmit={handleSearchSubmit}>
					<input
						type="text"
						placeholder="🔎 Search"
						value={searchTerm}
						onChange={handleInputChange}
						className="w-full lg:w-auto bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#40312A] mr-0 lg:mr-8"
					/>
				</form>
				{/* Dropdown Suggestions */}
				{suggestions.length > 0 && (
					<div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 p-2 w-full lg:w-auto">
						{suggestions.map((drink) => (
							<button
								key={drink.id}
								className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
								onClick={() => handleSuggestionClick(drink.name)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleSuggestionClick(drink.name);
								}}
								type="button"
								tabIndex={0}
							>
								{drink.name}
							</button>
						))}
					</div>
				)}
			</div>
		</nav>
	);
}
