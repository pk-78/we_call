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
    <div className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-teal-700">
        Buy Coins
      </h1>
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <img
              src="/coins.png"
              alt="Coins"
              className="h-32 w-32 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-teal-800">{offer.price}</h2>
            <p className="mt-2 text-sm text-gray-600">{offer.description}</p>
            <div className="mt-4">
              <p className="text-teal-700 font-semibold">
                Coins: <span className="font-bold">{offer.coins}</span>
              </p>
              {/* {offer.pinkCards && (
                <p className="text-pink-500 font-semibold">
                  Pink Cards:{" "}
                  <span className="font-bold">{offer.pinkCards}</span>
                </p>
              )}
              {(offer.orangeCards || offer.randomCards) && (
                <p className="text-orange-500 font-semibold">
                  Orange Cards:{" "}
                  <span className="font-bold">
                    {offer.orangeCards ?? offer.randomCards}
                  </span>
                </p>
              )} */}
            </div>
            <button className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
