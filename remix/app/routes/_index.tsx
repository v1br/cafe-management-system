import type { MetaFunction } from "@remix-run/node";

import Navbar from "~/components/shared/navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "cafe management system" },
    { name: "description", content: "A proof of concept website for software engineering, powered by remix!" },
  ];
};

export default function Index() {
  return (
    <>
    <Navbar/>
    <header className="flex flex-row h-fit items-start justify-center mt-[4em]">
      <div className="w-[26em] flex flex-col items-left gap-9">
        <h1 className="w-full leading text-6xl font-bold">
          Mindful Drinks<br/>For Calm
        </h1>
        <p className="w-4/5 pl-0 whitespace-none text-sm text-wrap">
          A lower-calorie version of the classic latte. Espresso and lactose-free milk come together in perfect harmony to bring lightness to your drink.
        </p>
        <div className="w-full flex flex-row gap-4 leading text-4xl font-bold">
          $3.40 
          <button className="inline-flex items-center gap-2 w-fit text-xl font-normal py-2 px-4 bg-white rounded-full">
            Buy Now <img src="icons/GoAhead.svg" alt=">" className="w-[1.5em] h-[1.5em] p-1 rounded-full bg-[#738D69]" />
          </button>
        </div>
      </div>
      <div className="w-fit flex flex-col items-left gap-9">
        <img src="assets/iced-gingerbread-latte.webp" alt="Remix" className="w-[18em] h-[18em] object-cover rounded-full" />
      </div>
      <div className="w-fit pl-[6em] flex flex-col items-left gap-9">
        <ul className="flex flex-col gap-[2em]">
          <li className="flex flex-row gap-4 justify-start items-center">
            <img src="icons/Latte.svg" alt="Latte" className="w-12" />
            <div>
              <div className="font-bold text-lg">Sugar Free</div>
              <div className="text-sm leading-0">Now without<br/>added sugar</div>
            </div>
          </li>
          <li className="flex flex-row gap-4 justify-start items-center">
            <img src="icons/EspressoRomano.svg" alt="Latte" className="w-12" />
            <div>
              <div className="font-bold text-lg">100% Premium</div>
              <div className="text-sm leading-0">Skinny Latte using<br/>100% premium Arabica beans</div>
            </div>
          </li>
          <li className="flex flex-row gap-4 justify-start items-center">
            <img src="icons/Corretto.svg" alt="Latte" className="w-12" />
            <div>
              <div className="font-bold text-lg">Chilled Classics</div>
              <div className="text-sm leading-0">New Skinny Latte<br/>Chilled Classics Coffee Line</div>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <main>
      
    </main>
    </>
  );
}