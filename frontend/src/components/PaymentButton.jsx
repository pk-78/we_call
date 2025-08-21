import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { url } from "../url/url";
import UserContext from "../context/UserContext";

export default function PaymentButton({ price, coins }) {
  const { id } = useContext(UserContext);
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState();
  const [enterAmount, setEnterAmount] = useState();

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY ;

  

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const createRazorpayOrder = (amount) => {
    const numericAmount = parseFloat(amount); // Will extract 10 from "10 Rs"
    let data = {
      amount: numericAmount * 100,
      currency: "INR",
    };
    console.log("Data:", data);

    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/api/payment/orders`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Inside Create RazorpayOrder", response);
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };
  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount,
      currency: "INR",
      name: "PK78",
      description: "Payment to pk78",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT7Q9Xo9QouXoJDlYivVWyn1Cko8rp3QaE6pkrwpBXaiBnGv9In",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);

        console.log(" inside handle razorpay screen", response);
      },
      prefill: {
        name: "Priyanshu Kushwaha",
        email: "priyanshu78@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  useEffect(() => {
    const addCoins = async () => {
      try {
        if (responseId) {
          const coinsResponse = await axios.post(
            `${url}/api/payment/checkPaymentAndAddcoins/${id}`,
            {
              paymentId: responseId,
              amount: price,
              coinsToAdd: coins,
            }
          );
          console.log(coinsResponse, "jud gya");
        }
      } catch (error) {
        console.log(error);
      }
    };

    addCoins();
  }, [responseId]);

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios
      .get(`${url}/api/payment/payment/${paymentId}`)
      .then((response) => {
        console.log("fetch payment", response);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.log("error occurs", error);
      });
  };
  return (
    <button
      onClick={() => createRazorpayOrder(price)}
      className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors"
    >
      Buy Now
    </button>
  );
}
