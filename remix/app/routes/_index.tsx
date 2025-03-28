import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import Navbar from "~/components/shared/navbar";
import { Carousel } from "~/components/ui/carousel";

export const meta: MetaFunction = () => {
	return [
		{ title: "Cafe Management System" },
		{
			name: "description",
			content:
				"A proof of concept website for software engineering, powered by Remix!",
		},
	];
};

export default function Index() {
	// Create the navigate function
	const navigate = useNavigate();

	// Define the navigation logic
	const handleClick = () => {
		navigate("/menu");
	};
	return (
		<>
			<Navbar />
			<header className="flex flex-col lg:flex-row items-center justify-center mt-16 px-6 lg:px-0">
				{/* Left Content */}
				<div className="w-full lg:w-[26em] flex flex-col items-start gap-6 lg:gap-9 text-center lg:text-left">
					<h1 className="text-4xl lg:text-6xl font-bold leading-tight">
						Mindful Drinks
						<br />
						For Calm
					</h1>
					<p className="w-full lg:w-4/5 text-sm">
						A lower-calorie version of the classic latte. Espresso and
						lactose-free milk come together in perfect harmony to bring
						lightness to your drink.
					</p>
					<div className="flex flex-col lg:flex-row gap-4 items-center text-4xl font-bold">
						<span>₹291</span>
						<button
							type="button"
							onClick={handleClick}
							className="inline-flex items-center gap-2 w-fit text-base lg:text-xl font-normal py-2 px-4 bg-white rounded-full shadow hover:shadow-lg"
						>
							Buy Now{" "}
							<img
								src="icons/GoAhead.svg"
								alt=">"
								className="w-[1.5em] h-[1.5em] p-1 rounded-full bg-[#738D69]"
							/>
						</button>
					</div>
				</div>

				{/* Image */}
				<div className="w-full lg:w-fit flex flex-col items-center mt-8 lg:mt-0">
					<img
						src="assets/iced-gingerbread-latte.webp"
						alt="Remix"
						className="w-[12em] lg:w-[18em] h-[12em] lg:h-[18em] object-cover rounded-full"
					/>
				</div>

				{/* Features List */}
				<div className="w-full lg:w-fit lg:pl-24 flex flex-col items-center lg:items-start mt-8 lg:mt-0">
					<ul className="flex flex-col gap-6 lg:gap-9">
						<li className="flex flex-row gap-4 justify-start items-center">
							<img src="icons/Latte.svg" alt="Latte" className="w-10 lg:w-12" />
							<div>
								<div className="font-bold text-sm lg:text-lg">Sugar Free</div>
								<div className="text-xs lg:text-sm">
									Now without
									<br />
									added sugar
								</div>
							</div>
						</li>
						<li className="flex flex-row gap-4 justify-start items-center">
							<img
								src="icons/EspressoRomano.svg"
								alt="Espresso"
								className="w-10 lg:w-12"
							/>
							<div>
								<div className="font-bold text-sm lg:text-lg">100% Premium</div>
								<div className="text-xs lg:text-sm">
									Skinny Latte using
									<br />
									100% premium Arabica beans
								</div>
							</div>
						</li>
						<li className="flex flex-row gap-4 justify-start items-center">
							<img
								src="icons/Corretto.svg"
								alt="Corretto"
								className="w-10 lg:w-12"
							/>
							<div>
								<div className="font-bold text-sm lg:text-lg">
									Chilled Classics
								</div>
								<div className="text-xs lg:text-sm">
									New Skinny Latte
									<br />
									Chilled Classics Coffee Line
								</div>
							</div>
						</li>
					</ul>
				</div>
			</header>
			<main className="mt-16 px-6 lg:px-0">
				<Carousel />
			</main>
		</>
	);
}
