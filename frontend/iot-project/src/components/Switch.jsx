import React from "react";

const Switch = ({ device, mode, set_mode }) => {
  return (
    <div className="flex items-center justify-between w-full min-h-[50px] px-4 py-2 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-md">
      {/* Label for the Device */}
      <span className="text-white text-base font-medium min-w-[100px]">{device}</span>

      {/* Toggle Switch */}
      <div className="flex items-center gap-6">
        <span className="text-gray-300 text-sm">Manual</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={mode === "AUTO"}
            onChange={() => set_mode(mode === "AUTO" ? "MANUAL" : "AUTO")}
          />
          <div className="w-14 h-7 bg-gray-600 peer-focus:ring-4 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
        <span className="text-gray-300 text-sm">Auto</span>
      </div>
    </div>
  );

};

export default Switch;
