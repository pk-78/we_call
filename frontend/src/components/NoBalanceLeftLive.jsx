import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoBalanceLeftLive() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate('/');
//     }, 5000);

//     return () => clearTimeout(timer); // cleanup
//   }, [navigate]);

  return (
    <div className="flex flex-col h-auto items-center justify-center rounded-2xl bg-teal-50 text-red-700 ">
      <div className="bg-white p-6 m-2 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">Insufficient Balance</h1>
        <p className="text-lg">You don't have enough balance to continue the live session.</p>
        <p className="text-lg mt-2 font-medium">Please recharge to proceed.</p>
        <div className="mt-4 animate-pulse text-sm text-gray-800">
          Redirecting to homepage...
        </div>
      </div>
    </div>
  );
}
