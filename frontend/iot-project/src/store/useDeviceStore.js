import { create } from "zustand";

const useDeviceStore = create((set) => ({
  deviceModes: {
    Led: "AUTO",
    Cooler: "AUTO",
    Pump: "AUTO",
    Fan: "AUTO",
    Humidifier: "AUTO",
  },
  setMode: (device, mode) =>
    set((state) => ({
      deviceModes: { ...state.deviceModes, [device]: mode },
    })),
}));

export default useDeviceStore;
