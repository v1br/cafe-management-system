import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
  } from "@remix-run/react";

export default function Menu() {
    return (
        <div className="flex flex-row w-screen h-screen items-center justify-center">
            <div className="flex flex-col w-full h-full items-center gap-16 border-red-100 border-2">
            <header className="flex flex-col items-center gap-9">
                <h1 className="leading text-2xl text-gray-700">
                Menu
                </h1>
                <div className="h-[144px] w-[434px]">
                <img
                    src="/logo-light.png"
                    alt="Remix"
                    className="block w-full"
                />
                </div>
            </header>
            <button className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 hover:drop-shadow-lg bg-gray-100 hover:bg-[#FECC1B] p-6">
                <p className="leading-6 text-gray-700">
                Place Order!
                </p>
            </button>
            </div>
            <div className="flex flex-col w-fit h-full items-center gap-16 border-red-100 border-2">
                <h1 className="leading text-2xl text-gray-700">
                <Outlet/>
                </h1>
            </div>
        </div>
    );
}