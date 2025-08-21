import React, { useEffect, useState } from "react";
import PaymentCard from "../components/PaymentCard";
import { url } from "../url/url";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const samplePayments = [
  {
    id: 1,
    userId: "user123",
    amount: "₹500",
    status: "pending",
    date: "2025-04-25",
  },
  {
    id: 2,
    userId: "user456",
    amount: "₹800",
    status: "approved",
    date: "2025-04-20",
  },
  {
    id: 3,
    userId: "user789",
    amount: "₹300",
    status: "rejected",
    date: "2025-04-18",
  },
];

export default function AdminHome() {
  const [filter, setFilter] = useState("pending");
  const [allPending, setAllPending] = useState([]);
  const [allApproved, setAllApproved] = useState([]);
  const [allRejected, setAllRejected] = useState([]);
  const navigate = useNavigate();

  const filteredPayments =
    filter === "pending"
      ? allPending
      : filter === "approved"
      ? allApproved
      : allRejected;

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
          axios.get(`${url}/api/admin/getPendingPayment`),
          axios.get(`${url}/api/admin/getApprovedPayment`),
          axios.get(`${url}/api/admin/getRejectedPayment`),
        ]);

        setAllPending(pendingRes?.data?.allPending || []);
        setAllApproved(approvedRes?.data?.completePayment || []);
        setAllRejected(rejectedRes?.data?.rejectedPayment || []);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    getAllPayments();
  }, []);

  console.log(allPending);
  console.log(allApproved);
  console.log(allRejected);

  return (
    <div className="">
      <div className=" bg-teal-600 flex justify-between">
        <h1 className="text-2xl font-bold mb-1 p-3 text-white">
          Admin Payment Panel
        </h1>
        <button
          className="pr-2 text-teal-600 bg-gray-50 rounded-md p-1 my-4 hover:bg-teal-600 hover:text-white mx-2 w-auto"
          onClick={() => {
            localStorage.removeItem("userType");
            navigate("/adminLogin");
          }}
        >
          Logout
        </button>
      </div>

      <div className="p-4">
        <div className="flex gap-4 mb-6">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded ${
                filter === status
                  ? "bg-teal-blue text-white"
                  : "bg-light-gray text-black"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="bg-gray-50 m-4">
          <h3 className="mb-2 text-xl">
            {filter?.charAt(0).toUpperCase() + filter?.slice(1).toLowerCase()}{" "}
            Payments
          </h3>

          {filteredPayments.length === 0 ? (
            <p className="text-gray-600">No {filter} payments found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPayments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} filteredPayments={filteredPayments} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
