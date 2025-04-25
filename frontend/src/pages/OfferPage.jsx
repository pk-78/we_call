import React, { useState } from "react";
import { url } from "../url/url";
import axios from "axios";
import PaymentButton from "../components/PaymentButton";

export default function OfferPage() {
  const offers = [
    {
      price: "10",
      coins: 200,
    },
    {
      price: "50",
      coins: 500,
    },
    {
      price: "100",
      coins: 1000,
    },
    {
      price: "300",
      coins: 5000,
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
            <h2 className="text-2xl font-bold text-teal-800">
              {offer.price} Rs
            </h2>
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
            <PaymentButton price={offer.price} coins={offer.coins} />
          </div>
        ))}
      </div>
    </div>
  );
}
