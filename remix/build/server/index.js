import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useNavigate, useLocation, Link, useSearchParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/icons/Cafe.svg"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "w-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "h-fit min-h-screen pb-8 bg-[#FFEFE2] text-[#40312A] overflow-x-hidden overflow-y-auto", children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const drinks = [
  {
    id: 1,
    name: "Caramel Macchiato",
    description: "Espresso combined with vanilla-flavored syrup, milk, and caramel drizzle.",
    category: "Coffee",
    price: 220,
    size: [
      "Small",
      "Medium",
      "Large"
    ],
    calories: {
      Small: 150,
      Medium: 250,
      Large: 310
    },
    image_url: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100405.jpg"
  },
  {
    id: 2,
    name: "Caffè Mocha",
    description: "Espresso with bittersweet mocha sauce and steamed milk, topped with whipped cream.",
    category: "Coffee",
    price: 240,
    size: [
      "Small",
      "Medium",
      "Large"
    ],
    calories: {
      Small: 190,
      Medium: 290,
      Large: 370
    },
    image_url: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100385.jpg"
  },
  {
    id: 3,
    name: "Hot Chocolate",
    description: "Rich and creamy hot chocolate topped with whipped cream and chocolate drizzle.",
    category: "Hot Chocolate",
    price: 200,
    size: [
      "Small",
      "Medium",
      "Large"
    ],
    calories: {
      Small: 180,
      Medium: 280,
      Large: 350
    },
    image_url: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100447.jpg"
  },
  {
    id: 4,
    name: "Vanilla Latte",
    description: "Smooth espresso, steamed milk, and vanilla syrup for a classic taste.",
    category: "Coffee",
    price: 230,
    size: [
      "Small",
      "Medium",
      "Large"
    ],
    calories: {
      Small: 160,
      Medium: 260,
      Large: 330
    },
    image_url: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100377.jpg"
  },
  {
    id: 5,
    name: "Chai Tea Latte",
    description: "A spicy and aromatic blend of black tea, milk, and chai spices.",
    category: "Tea",
    price: 210,
    size: [
      "Small",
      "Medium",
      "Large"
    ],
    calories: {
      Small: 130,
      Medium: 230,
      Large: 290
    },
    image_url: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100360.jpg"
  },
  {
    id: 6,
    name: "White Chocolate Mocha",
    description: "Espresso, steamed milk, and white chocolate sauce topped with whipped cream.",
    category: "Coffee",
    price: 250,
    size: [
      "Small",
      "Medium",
      "Large"
    ],
    calories: {
      Small: 200,
      Medium: 320,
      Large: 400
    },
    image_url: "https://starbucksstatic.cognizantorderserv.com/Items/Small/103973.jpg"
  }
];
function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useLocation();
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    if (query) {
      setSuggestions(
        drinks.filter((drink) => drink.name.toLowerCase().includes(query)).slice(0, 5)
        // Limit suggestions to top 5
      );
    } else {
      setSuggestions([]);
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    navigate(`/menu?search=${searchTerm}`);
  };
  const handleSuggestionClick = (drinkName) => {
    setSearchTerm(drinkName);
    setSuggestions([]);
    navigate(`/menu?search=${drinkName}`);
  };
  return /* @__PURE__ */ jsxs("nav", { className: "flex flex-col lg:flex-row items-center w-full py-4 px-6 lg:px-16 justify-between bg-[#FFEFE2] shadow-md relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full lg:w-fit items-center justify-between lg:justify-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("img", { src: "icons/Cafe.svg", alt: "Logo", className: "w-[2em] h-[2em]" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-lg font-bold hover:underline", children: "Cafe Management System" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsMenuOpen(!isMenuOpen),
          className: "lg:hidden flex items-center justify-center w-10 h-10 bg-[#40312A] text-white rounded-md",
          children: "☰"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "ul",
      {
        className: `${isMenuOpen ? "flex" : "hidden"} flex-col lg:flex lg:flex-row h-fit gap-4 lg:gap-8 items-center mt-4 lg:mt-0 absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#FFEFE2] lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 shadow-lg lg:shadow-none`,
        children: [
          /* @__PURE__ */ jsx("li", { className: "lg:hidden w-full", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSearchSubmit, className: "w-full", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "🔎 Search",
              value: searchTerm,
              onChange: handleInputChange,
              className: "w-full bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#40312A]"
            }
          ) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/menu",
              className: "text-sm lg:text-base font-medium hover:underline",
              onClick: () => setIsMenuOpen(false),
              children: "Menu"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/cart",
              className: "text-sm lg:text-base font-medium hover:underline",
              onClick: () => setIsMenuOpen(false),
              children: "Cart"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "text-sm lg:text-base font-medium hover:underline",
              onClick: () => setIsMenuOpen(false),
              children: "About"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative hidden lg:block mt-4 lg:mt-0 w-full lg:w-auto", children: [
      /* @__PURE__ */ jsx("form", { onSubmit: handleSearchSubmit, children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "🔎 Search",
          value: searchTerm,
          onChange: handleInputChange,
          className: "w-full lg:w-auto bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#40312A] mr-0 lg:mr-8"
        }
      ) }),
      suggestions.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute z-10 bg-white shadow-lg rounded-md mt-2 p-2 w-full lg:w-auto", children: suggestions.map((drink) => /* @__PURE__ */ jsx(
        "button",
        {
          className: "cursor-pointer hover:bg-gray-200 p-2 rounded-md",
          onClick: () => handleSuggestionClick(drink.name),
          onKeyDown: (e) => {
            if (e.key === "Enter") handleSuggestionClick(drink.name);
          },
          type: "button",
          tabIndex: 0,
          children: drink.name
        },
        drink.id
      )) })
    ] })
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const meta = () => {
  return [
    { title: "Cafe Management System" },
    {
      name: "description",
      content: "A proof of concept website for software engineering, powered by Remix!"
    }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("header", { className: "flex flex-col lg:flex-row items-center justify-center mt-16 px-6 lg:px-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[26em] flex flex-col items-start gap-6 lg:gap-9 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-6xl font-bold leading-tight", children: [
          "Mindful Drinks",
          /* @__PURE__ */ jsx("br", {}),
          "For Calm"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "w-full lg:w-4/5 text-sm", children: "A lower-calorie version of the classic latte. Espresso and lactose-free milk come together in perfect harmony to bring lightness to your drink." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4 items-center text-4xl font-bold", children: [
          /* @__PURE__ */ jsx("span", { children: "$3.40" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center gap-2 w-fit text-base lg:text-xl font-normal py-2 px-4 bg-white rounded-full shadow hover:shadow-lg",
              children: [
                "Buy Now",
                " ",
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "icons/GoAhead.svg",
                    alt: ">",
                    className: "w-[1.5em] h-[1.5em] p-1 rounded-full bg-[#738D69]"
                  }
                )
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-fit flex flex-col items-center mt-8 lg:mt-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "assets/iced-gingerbread-latte.webp",
          alt: "Remix",
          className: "w-[12em] lg:w-[18em] h-[12em] lg:h-[18em] object-cover rounded-full"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-fit lg:pl-24 flex flex-col items-center lg:items-start mt-8 lg:mt-0", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-6 lg:gap-9", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex flex-row gap-4 justify-start items-center", children: [
          /* @__PURE__ */ jsx("img", { src: "icons/Latte.svg", alt: "Latte", className: "w-10 lg:w-12" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-sm lg:text-lg", children: "Sugar Free" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs lg:text-sm", children: [
              "Now without",
              /* @__PURE__ */ jsx("br", {}),
              "added sugar"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex flex-row gap-4 justify-start items-center", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "icons/EspressoRomano.svg",
              alt: "Espresso",
              className: "w-10 lg:w-12"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-sm lg:text-lg", children: "100% Premium" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs lg:text-sm", children: [
              "Skinny Latte using",
              /* @__PURE__ */ jsx("br", {}),
              "100% premium Arabica beans"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex flex-row gap-4 justify-start items-center", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "icons/Corretto.svg",
              alt: "Corretto",
              className: "w-10 lg:w-12"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-sm lg:text-lg", children: "Chilled Classics" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs lg:text-sm", children: [
              "New Skinny Latte",
              /* @__PURE__ */ jsx("br", {}),
              "Chilled Classics Coffee Line"
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "mt-16 px-6 lg:px-0", children: /* @__PURE__ */ jsx(Carousel, {}) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function Menu$1() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "w-3/4 m-auto", children: "ABOUT" })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Menu$1
}, Symbol.toStringTag, { value: "Module" }));
function Cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  const updateQuantity = (drinkId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === drinkId) {
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : item.quantity
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const deleteDrink = (drinkId) => {
    const updatedCart = cart.filter((item) => item.id !== drinkId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const calculateTotalBill = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const gst = subtotal * 0.05;
    return (subtotal + gst).toFixed(2);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "w-3/4 m-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold my-8", children: "Your Cart" }),
      cart.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4", children: cart.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full h-32 px-4",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.image_url,
                  alt: item.name,
                  className: "w-24 h-24 object-cover flex-shrink-0 mr-4 rounded-md"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold", children: item.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
                  "₹",
                  item.price
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center my-2", children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: `quantity-${item.id}`,
                      className: "text-sm font-medium mr-2",
                      children: "Quantity:"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      value: item.quantity,
                      min: "1",
                      onChange: (e) => updateQuantity(
                        item.id,
                        Number.parseInt(e.target.value, 10)
                      ),
                      className: "bg-gray-100 px-2 py-1 rounded-md w-16"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => deleteDrink(item.id),
                      className: "ml-4 text-xs text-red-500 font-bold hover:scale-110",
                      children: "X"
                    }
                  )
                ] })
              ] })
            ]
          },
          item.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 mx-4 p-4 bg-gray-100 rounded-lg shadow-md", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg font-medium", children: [
            "Total Bill (including GST): ₹",
            calculateTotalBill()
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-8", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: clearCart,
                className: "lg:hidden bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600",
                children: "Clear"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => alert(
                  "Thank you for placing an order!\n\n{This is a dummy alert, to be redirected to the external payment portal via backend microservice...}"
                ),
                className: "lg:hidden bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600",
                children: "Confirm"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: clearCart,
                className: "hidden lg:block bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600",
                children: "Clear Cart"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => alert(
                  "Thank you for placing an order!\n\n{This is a dummy alert, to be redirected to the external payment portal via backend microservice...}"
                ),
                className: "hidden lg:block bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600",
                children: "Place Order"
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Your cart is empty!" })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cart
}, Symbol.toStringTag, { value: "Module" }));
function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState(drinks);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    var _a;
    const query = ((_a = searchParams.get("search")) == null ? void 0 : _a.toLowerCase()) || "";
    setSearchTerm(query);
    if (query) {
      setFilteredDrinks(
        drinks.filter((drink) => drink.name.toLowerCase().includes(query))
      );
    } else {
      setFilteredDrinks(drinks);
    }
  }, [searchParams]);
  const handleAddToCart = (drink) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingDrink = cart.find((item) => item.id === drink.id);
    if (existingDrink) {
      existingDrink.quantity = (existingDrink.quantity || 0) + 1;
    } else {
      cart.push({ ...drink, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${drink.name} has been added to your cart!`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "w-3/4 h-full m-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold my-8", children: "Available Drinks" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4", children: filteredDrinks.map((drink) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full h-32 px-4",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: drink.image_url,
                alt: drink.name,
                className: "w-24 h-24 object-cover flex-shrink-0 mr-4 rounded-md"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold line-clamp-2", children: drink.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 line-clamp-2", children: drink.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center my-2", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-gray-900 mt-1", children: [
                  "₹",
                  drink.price
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "bg-[#40312A] text-white text-xs p-2 rounded-md font-medium hover:bg-[#5a4739]",
                    onClick: () => handleAddToCart(drink),
                    children: "Add to Cart"
                  }
                )
              ] })
            ] })
          ]
        },
        drink.id
      )) })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Menu
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-sapbE9gW.js", "imports": ["/assets/components-DsaIHRdB.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-8oeBc-rZ.js", "imports": ["/assets/components-DsaIHRdB.js"], "css": ["/assets/root-IaLV7MXT.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DACWT-B3.js", "imports": ["/assets/components-DsaIHRdB.js", "/assets/navbar-B8fM27GP.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-Br9q5cgf.js", "imports": ["/assets/components-DsaIHRdB.js", "/assets/navbar-B8fM27GP.js"], "css": [] }, "routes/cart": { "id": "routes/cart", "parentId": "root", "path": "cart", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/cart-DURrW7nu.js", "imports": ["/assets/components-DsaIHRdB.js", "/assets/navbar-B8fM27GP.js"], "css": [] }, "routes/menu": { "id": "routes/menu", "parentId": "root", "path": "menu", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/menu-CbcpzFMp.js", "imports": ["/assets/components-DsaIHRdB.js", "/assets/navbar-B8fM27GP.js"], "css": [] } }, "url": "/assets/manifest-40df30cd.js", "version": "40df30cd" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/cart": {
    id: "routes/cart",
    parentId: "root",
    path: "cart",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/menu": {
    id: "routes/menu",
    parentId: "root",
    path: "menu",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
