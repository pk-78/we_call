import React from "react";

export default function OfferPage() {
  const offers = [
    {
      price: "10 Rs",
      coins: 200,
      pinkCards: 1,
      orangeCards: 2,
      description: "Single pink card, 2 orange cards, and 200 coins",
    },
    {
      price: "50 Rs",
      coins: 500,
      pinkCards: 2,
      orangeCards: 2,
      description: "2 pink cards, 2 orange cards, and 500 coins",
    },
    {
      price: "100 Rs",
      coins: 1000,
      pinkCards: 4,
      orangeCards: 5,
      description: "1000 coins, 4 pink cards, and 5 orange cards",
    },
    {
      price: "300 Rs",
      coins: 5000,
      pinkCards: 5,
      randomCards: 10,
      description: "5000 coins, 5 pink cards, and 10 random cards",
    },
  ];

  return (
    <div className="px-72 bg-gray-100 p-6">
      <h1 className="text-center text-4xl font-bold mb-8 text-teal-700">
        Buy Coins
      </h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <img src="/coins.png" alt="" className="h-40 w-40" />
            <h2 className="text-2xl font-bold text-teal-800">{offer.price}</h2>
            <div className="mt-4">
              <p className="text-sm text-teal-700 font-semibold ">
                Coins: {offer.coins}
              </p>
              <p className="text-sm text-pink-500 font-semibold ">
                Pink Cards: {offer.pinkCards}
              </p>
              <p className="text-sm text-orange-500  font-semibold">
                Orange Cards: {offer.orangeCards ?? offer.randomCards}
              </p>
            </div>
            <button className="mt-6 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
