import React, { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const Moisture = ({client}) => {
  const [moist, setMoist] = useState(10); // Default temperature

  useEffect(() => {
    if (!client) return;

    const topic = "esp32/moisture";

    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Subscription error:", err);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });

    client.on("message", (topic, message) => {
      if (topic === "esp32/moisture") {
        const receivedMoist = parseFloat(message.toString()); // Convert MQTT message to number
        setMoist(receivedMoist);
      }
    });
  }, [client]);
  // Function to determine gauge color based on temperature value
  const getColor = (value) => {
    if (value <= 20) return "#00BFFF"; // Blue for cold
    if (value <= 40) return "#32CD32"; // Green for normal
    if (value <= 60) return "#FFD700"; // Yellow for warm
    if (value <= 80) return "#FF8C00"; // Orange for hot
    return "#FF0000"; // Red for very hot
  };

  const data = [{ name: "Temp", value: moist, fill: getColor(moist) }];

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-5 flex flex-col items-center w-64">
      <h2 className="text-gray-800 text-xl font-extrabold mb-2">Soil Moisture</h2>
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
      <h2 className="text-green text-2xl font-bold mt-3">{moist}</h2>
    </div>
  );
};

export default Moisture