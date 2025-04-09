import React, { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { useNotificationStore } from "../store/useNotificationStore";


const Co2 = ({client}) => {
  const [co2, setCo2] = useState(10); 
  const {checkSensorValue} = useNotificationStore()
  
  

  useEffect(() => {
    if (!client) return;

    const topic = "esp32/co2";

    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Subscription error:", err);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });

    client.on("message", (topic, message) => {
      if (topic === "esp32/co2") {
        const receivedCo2 = parseFloat(message.toString()); // Convert MQTT message to number
        setCo2(receivedCo2);
        checkSensorValue("co2", receivedCo2)
      }
    });
  }, [client,checkSensorValue]);
  // Function to determine gauge color based on temperature value
  const getColor = (value) => {
    if (value <= 20) return "#00BFFF"; // Blue for cold
    if (value <= 40) return "#32CD32"; // Green for normal
    if (value <= 60) return "#FFD700"; // Yellow for warm
    if (value <= 80) return "#FF8C00"; // Orange for hot
    return "#FF0000"; // Red for very hot
  };

  const data = [{ name: "Temp", value: co2, fill: getColor(co2) }];

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-5 flex flex-col items-center w-64">
      <h2 className="text-gray-800 text-xl font-extrabold mb-2">Co2 Content</h2>
      <div className="bg-gray-700/20 backdrop-blur-md rounded-full p-4">
        <RadialBarChart
          width={200}
          height={200}
          cx={100}
          cy={100}
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar minAngle={15} clockWise dataKey="value" />
        </RadialBarChart>
      </div>
      <h2 className="text-green text-2xl font-bold mt-3">{co2} ppm</h2>
    </div>
  );
};

export default Co2