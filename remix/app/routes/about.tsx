import { Outlet } from "@remix-run/react";
import Navbar from "~/components/shared/navbar";

export default function About() {
    return (
        <>
            <Navbar />
            <main className="w-3/4 m-auto">
                <section className="text-center my-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our World!</h1>
                    <p className="text-lg text-gray-700">
                        A cozy space where every cup of coffee tells a story and every meal is a memory in the making.
                    </p>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
                    {/* About the Cafe */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-gray-700 text-sm">
                            What started as a humble idea to create the perfect brew has blossomed into a sanctuary for coffee lovers and food enthusiasts alike. With a focus on sustainability and community, we’ve built a space that fosters connection over delicious drinks, thoughtfully curated meals, and a passion for craftsmanship.
                        </p>
                        <p className="text-gray-700 text-sm">
                            Whether you're here to savor your morning espresso, indulge in a hearty brunch, or find solace in our warm ambiance, we welcome you to become part of our story.
                        </p>
                    </div>

                    {/* Unique Offerings */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold">Our Values</h2>
                        <p className="text-gray-700 text-sm">
                            Our cafe is committed to using locally sourced ingredients, ensuring that we support farmers and producers within our community. We prioritize sustainability by utilizing eco-friendly practices and minimizing waste wherever possible. With precise craftsmanship, every cup of coffee and dish we serve is thoughtfully prepared with care and attention to detail. Above all, we are dedicated to fostering a sense of community love, creating a welcoming space for everyone to connect and share memorable moments.
                        </p>
                    </div>
                </section>

                <section className="bg-white shadow-md rounded-lg p-8 my-12">
                    <h2 className="text-3xl font-bold text-center mb-6">Our Specialties</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <img
                                src="icons/EspressoRomano.svg"
                                alt="Espresso"
                                className="w-16 h-16"
                            />
                            <h3 className="text-xl font-bold">Signature Espresso</h3>
                            <p className="text-sm text-gray-700">
                                An intense, aromatic brew that awakens the senses.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <img
                                src="icons/Latte.svg"
                                alt="Latte"
                                className="w-16 h-16"
                            />
                            <h3 className="text-xl font-bold">Artisan Lattes</h3>
                            <p className="text-sm text-gray-700">
                                A fusion of smooth milk and rich espresso, topped with flair.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <img
                                src="icons/Corretto.svg"
                                alt="Dessert"
                                className="w-16 h-16"
                            />
                            <h3 className="text-xl font-bold">Gourmet Desserts</h3>
                            <p className="text-sm text-gray-700">
                                Indulge in our house-made cakes and pastries, crafted to perfection.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="my-12">
                    <h2 className="text-3xl font-bold text-center mb-4">Visit Us</h2>
                    <p className="text-center text-gray-700 text-sm">
                        Nestled in the heart of the city, we&apos;re open every day from sunrise to sunset. Drop by, and let us make your day a little brighter!
                    </p>
                </section>
            </main>
        </>
    );
}
