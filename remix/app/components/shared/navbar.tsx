import {
    Link,
  } from "@remix-run/react";

export default function Navbar() {

    return (
        <nav className="flex flex-row items-center w-full h-fit py-8 justify-between font-medium">
            <div className="flex w-fit h-fit ml-16 items-center justify-center gap-4">
                <img src="icons/Cafe.svg" alt="Logo" className="w-[2em] h-[2em]" />
                <span>Cafe Management System</span>
            </div>
            <ul className="flex flex-row h-fit gap-12 items-center">
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <input type="text" placeholder="🔎 Search" className="bg-white px-4 py-2 mr-16 rounded-full focus:outline-none focus:ring-2 focus:ring-[#40312A] !important" />
        </nav>
    );

}