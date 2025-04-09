import React,{useState,useEffect} from "react";
import mqtt from "mqtt";
import Led from "../actuators/Led";
import Cooler from "../actuators/Cooler";
import Pump from "../actuators/Pump";
import Temperature from "../monitoring/Temperature";
import Fan from "../actuators/Fan";
import Humidifier from "../actuators/Humidifier";
import Moisture from "../monitoring/Moisture";
import Light from "../monitoring/Light";
import Humidity from "../monitoring/Humidity";
import Co2 from "../monitoring/Co2";
import useDeviceStore from "../store/useDeviceStore";
import Switch from "../components/Switch";

const broker = "ws://192.168.1.38:8883";
const client = mqtt.connect(broker);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});


const Home = () => {
  const devices = ["Led", "Cooler", "Pump", "Fan", "Humidifier"];
  const { deviceModes, setMode } = useDeviceStore();
  
  const publishMode = (device, mode) => {
    client.publish(`esp32/mode/${device.toLowerCase()}`, mode, { retain: true });
  };

  useEffect(() => {
    devices.forEach((device) => publishMode(device, "AUTO"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent pt-20 pb-10 relative">

      
      {/* Monitoring Section */}
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-white text-2xl font-bold">Monitoring</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Temperature client={client} />
          <Moisture client={client} />
          <Light client={client} />
          <Humidity client={client} />
          <Co2 client={client} />
        </div>
      </div>
  
      {/* Divider */}
      <div className="w-full my-10 flex justify-center">
        <div className="h-2 w-3/4 bg-black/30 backdrop-blur-md rounded-full shadow-md"></div>
      </div>
  
      {/* Control Section */}
      <div className="flex flex-col items-center justify-center space-y-8">
        <h2 className="text-white text-2xl font-bold">Control Panel</h2>
        <div className="flex flex-col gap-3 md:flex-row w-full justify-center">
          {/* Left Side - Switches */}
          <div className="flex flex-col items-center md:px-16 mx-4 space-y-4 p-6 bg-black/30 backdrop-blur-md rounded-2xl shadow-md">
            <h3 className="text-white text-lg font-semibold mb-2">Device Modes</h3>
            <div className="flex flex-col w-full gap-4"> 
              {devices.map((device) => (
                <Switch
                  key={device}
                  device={device}
                  mode={deviceModes[device]}
                  set_mode={(newMode) => {
                    setMode(device, newMode);
                    publishMode(device, newMode);
                  }}
                />
              ))}
            </div>
          </div>


          {/* Right Side - Controls */}
          <div className="flex flex-wrap justify-center gap-4 ml-6">
            <Led client={client} />
            <Cooler client={client} />
            <Pump client={client} />
            <Fan client={client} />
            <Humidifier client={client} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
