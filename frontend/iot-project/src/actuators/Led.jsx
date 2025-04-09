import React from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";
import useDeviceStore from '../store/useDeviceStore';
import toast from "react-hot-toast"


const Led = ({client}) => {
  const {deviceModes} = useDeviceStore();
  const device="Led"
    
  const topic = "esp32/led";

  const sendMessage = (message) => {
    if(deviceModes[device]==="AUTO"){
      toast.error("Turn on Manual mode first!");
      return;
    }
    client.publish(topic, message);
    console.log(`Sent: ${message}`);
  };


  return (
    <div className="p-6 bg-white/30 backdrop-blur-md shadow-lg rounded-3xl text-center w-40 sm:w-44 max-w-full h-[180px] flex flex-col justify-between">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 tracking-wide truncate">
      LED 
      </h2>
  
      {/* Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => sendMessage("1")}
          className="flex items-center justify-center space-x-2 text-lg font-semibold px-2 py-1 rounded-full shadow-md transition-all hover:scale-105 hover:shadow-lg bg-green-500 text-white"
        >
          <Lightbulb size={24} className="text-blue-500"/>
          <span className="truncate">Turn ON</span>
        </button>
  
        <button
          onClick={() => sendMessage("0")}
          className="flex items-center justify-center space-x-2 text-lg font-semibold px-2 py-1 rounded-full shadow-md transition-all hover:scale-105 hover:shadow-lg bg-red-500 text-white"
        >
          <LightbulbOff size={24} />
          <span className="truncate">Turn OFF</span>
        </button>
      </div>
    </div>
  );
  
}

export default Led