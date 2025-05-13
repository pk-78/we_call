import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { url } from "../url/url";
import toast from "react-hot-toast";

export default function MyWallet() {
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [upiId, setUpiId] = useState("sachin@upi");
  const [newUpiId, setNewUpiId] = useState("");
  const [history, setHistory] = useState([]);
  const id = localStorage.getItem("id");
  const [tokenBalance, setTokenBalance] = useState(0);

  const handleWithdraw = async () => {
    // alert("Withdraw request initiated!");
    if (userDetail?.TotalEarning < 2300) {
      return toast.error("You should have atleast 23000 tokens");
    }
    try {
      const response = await axios.post(
        `${url}/api/wallet/initiateTransaction/${id}`,
        { upiId }
      );
      console.log(response);
      toast.success("Payment request initiated");
      setTokenBalance(0);
    } catch (error) {
      console.log(error);
      toast.error("Error in money withdrawl");
    }
  };

  const handleUPIChange = async () => {
    try {
      const response = await axios.post(`${url}/api/user/changeUpi/${id}`, {
        upiId: newUpiId,
      });
      console.log(response);
      setUpiId(newUpiId);
      setNewUpiId("");
      setShowUPIModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const {
    isLoggedIn,

    userDetail,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `${url}/api/wallet/getAllTransaction/${id}`
        );
        console.log(response);
        setHistory(response?.data?.transactions);
      } catch (error) {
        console.log(error);
        toast.error("Error in fetching transaction");
      }
    };

    fetchTransaction();
  }, [id]);
  useEffect(() => {
    if (userDetail?.TotalEarning) {
      setTokenBalance(userDetail.TotalEarning);
    }
  }, [userDetail]);

  console.log(history);

  return (
    <div className="p-4 space-y-6">
      {/* Wallet Summary */}
      <div className="bg-teal-600 text-white p-6 rounded-2xl shadow-md flex flex-col gap-6">
        <h3 className="text-2xl font-semibold">My Wallet</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-200">Name</p>
            <p className="text-lg font-bold">{userDetail?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-200">Token Balance</p>
            <p className="text-lg font-bold">{tokenBalance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-200">Equivalent Money</p>
            <p className="text-lg font-bold">
              ₹{(Number(tokenBalance) / 22.6).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-200">UPI ID</p>
            <p className="text-lg font-bold">{userDetail?.upiId}</p>
          </div>
        </div>

        {/* Buttons at bottom */}
        <div className="flex md:flex-row gap-3 mt-2 self-end">
          <button
            onClick={() => setShowUPIModal(true)}
            className="bg-white text-teal-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Change UPI ID
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-white text-teal-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Withdraw Money
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="py-2 px-4 border">Date</th>

                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Token</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">TransactionId</th>
              </tr>
            </thead>
            {history?.map((trans, id) => (
              <tbody key={id}>
                <tr className="text-center text-sm">
                  <td className="py-2 px-4 border">{trans?.createdAt}</td>

                  <td className="py-2 px-4 border">₹{trans?.amount}</td>

                  <td className="py-2 px-4 border">{trans?.token}</td>
                  <td
                    className={`py-2 px-4 border  ${
                      trans?.status === "rejected"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {trans?.status}
                  </td>
                  <td
                    className={`py-2 px-4 border ${
                      trans?.status === "rejected"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {trans?.transactionId}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      {/* UPI Modal */}
      {showUPIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Change UPI ID
            </h2>
            <input
              type="text"
              placeholder="Enter new UPI ID"
              value={newUpiId}
              onChange={(e) => setNewUpiId(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUPIModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUPIChange}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
