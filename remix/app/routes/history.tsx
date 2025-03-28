import React, { useState, useEffect } from "react";
import Navbar from "~/components/shared/navbar";

interface Order {
    id: number;
    items: {
        id: number;
        name: string;
        quantity: number;
        price: number;
        image_url: string;
    }[];
    total: string;
    date: string;
}

export default function History() {
    const [history, setHistory] = useState<Order[]>([]);

    // Load order history from localStorage
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
        setHistory(storedHistory);
    }, []);

    return (
        <>
            <Navbar />
            <main className="w-3/4 m-auto">
                <h1 className="text-3xl font-bold my-8">Order History</h1>
                {history.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 p-4">
                        {history.map((order) => (
                            <div
                                key={order.id}
                                className="bg-gray-100 shadow-md rounded-lg overflow-hidden w-full p-4"
                            >
                                {/* Order Details */}
                                <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold">Order #{order.id}</h2>
                                        <p className="text-sm text-gray-600">{order.date}</p>
                                    </div>
                                    <p className="text-lg font-medium">Total: ₹{order.total}</p>
                                </div>
                                {/* Items in Order */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center bg-white shadow rounded-lg p-4"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div>
                                                <h3 className="text-sm font-bold">{item.name}</h3>
                                                <p className="text-sm text-gray-700">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    Price: ₹{item.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg font-medium">You have no order history!</p>
                )}
            </main>
        </>
    );
}
