import React, { useState, useEffect } from "react";
import { url } from "../url/url";
import axios from "axios";
import PaymentButton from "../components/PaymentButton";

export default function OfferPage() {
  const offers = [
    { price: "10", coins: 200 },
    { price: "50", coins: 500 },
    { price: "100", coins: 1000 },
    { price: "300", coins: 5000 },
  ];

  const [paymentHistory, setPaymentHistory] = useState("");
  const id = localStorage.getItem("id")

  useEffect(() => {
    // Fetch payment history from API (dummy now)
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${url}/api/payment/paymentHistory/${id}`);
        const sorted =res.data.history?.sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt))
        setPaymentHistory(sorted);
      } catch (error) {
        console.error("Failed to fetch payment history", error);
      }
    };

    fetchHistory();
  }, []);
  console.log(paymentHistory)
 

  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 min-h-screen">
      {/* Buy Coins Section */}
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-12 text-teal-700">
        Buy Coins
      </h1>
      <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center"
          >
            <img
              src="/coins.png"
              alt="Coins"
              className="h-28 w-28 mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-teal-800">{offer.price} ₹</h2>
            <p className="mt-3 text-gray-500 text-sm italic">Best Value</p>
            <div className="mt-6">
              <p className="text-lg text-teal-700 font-semibold">
                🎉 {offer.coins} Coins
              </p>
            </div>
            <div className="mt-8">
              <PaymentButton price={offer.price} coins={offer.coins} />
            </div>
          </div>
        ))}
      </div>

      {/* Payment History Section */}
      <div className="mt-20">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-teal-700 mb-8">
          Payment History
        </h2>

        {paymentHistory?.length === 0 ? (
          <p className="text-center text-gray-500">No payments yet.</p>
        ) : (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Amount (₹)</th>
                  <th className="py-3 px-6 text-left">Coins</th>
                  <th className="py-3 px-6 text-left">Payment Id</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory?.map((payment, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="py-4 px-6">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6">{payment.amount}</td>
                    <td className="py-4 px-6">{payment.finalCoin-payment.initialCoin}</td>
                    <td className="py-4 px-6">{payment.paymentId}</td>
                    <td className="py-4 px-6">
                      {payment.status !== "success" ? (
                        <span className="text-green-600 font-semibold">Success</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Failed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
