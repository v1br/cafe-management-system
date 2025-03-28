import { Outlet } from "@remix-run/react";
import Navbar from "~/components/shared/navbar";

export default function Menu() {
	return (
		<>
			<Navbar />
			<main className="w-3/4 m-auto">ABOUT</main>
		</>
	);
}
