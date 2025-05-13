import axios from "axios";
import React, { useState } from "react";
import { url } from "../url/url";

export default function PaymentCard({ payment }) {
  const [action, setAction] = useState(""); // "approve" or "reject"
  const [transactionId, setTransactionId] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(payment);

  const changeStatus = async () => {
    setLoading(true);
    if (action === "approve") console.log(transactionId);
    else {
      console.log(comment);
    }
    let method = "approvePayment";

    action === "approve"
      ? method === "approvePayment"
      : (method = "rejectPayment");

    try {
      const response = await axios.post(`${url}/api/admin/${method}`, {
        transactionId,
        paymentId: payment?._id,
        comment,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="border border-teal-500 rounded-xl w-80 p-4 shadow-md bg-white transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
      
      <div>
        <span className="font-semibold text-teal-blue">User ID:</span>{" "}
        {payment?.userId}
      </div>
      <div>
        <span className="font-semibold text-teal-blue">Token:</span>{" "}
        {payment?.token}
      </div>
      <div>
        <span className="font-semibold text-teal-blue">Amount:</span>{" "}
        {payment?.amount}
      </div>
      <div>
        <span className="font-semibold text-teal-blue">Date:</span>{" "}
        {payment?.updatedAt?.split("T")[0]}
      </div>
      <div>
        <span className="font-semibold text-teal-blue">Status:</span>{" "}
        {payment?.status}
      </div>
      {payment?.status === "approved" ? (
        <div>
          <span className="font-semibold text-teal-blue">Transaction Id:</span>{" "}
          {payment?.transactionId}
        </div>
      ) : payment?.status === "rejected" ? (
        <div>
          <span className="font-semibold text-teal-blue">Comment:</span>{" "}
          {payment?.comment}
        </div>
      ) : (
        <div>
          <span className="font-semibold text-teal-blue">Upi Id:</span>{" "}
          {payment?.upiId}
        </div>
      )}

      {payment?.status === "pending" && (
        <div>
          <div className="mt-3">
            <div className="flex gap-2">
              <button
                onClick={() => setAction("approve")}
                className={`px-3 py-1 rounded transition-all duration-200 ${
                  action === "approve"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 hover:bg-teal-100"
                }`}
              >
                Approve
              </button>

              <button
                onClick={() => setAction("reject")}
                className={`px-3 py-1 rounded transition-all duration-200 ${
                  action === "reject"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-red-100"
                }`}
              >
                Reject
              </button>
            </div>

            {action === "approve" && (
              <input
                type="text"
                placeholder="Enter Payment ID"
                className="border border-gray-300 mt-2 px-2 py-1 rounded w-full"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            )}

            {action === "reject" && (
              <input
                type="text"
                placeholder="Enter Comment"
                className="border border-gray-300 mt-2 px-2 py-1 rounded w-full"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            )}
          </div>

          <button
            onClick={changeStatus}
            className="bg-teal-600 text-white p-2 mt-3 rounded-md cursor-pointer w-full"
          >
            <div className="flex justify-center items-center">
              {loading ? <div class="loader"></div> : "Update Status"}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
