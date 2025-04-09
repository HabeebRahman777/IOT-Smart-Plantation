import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  notifications: [], 

  
  addNotification: (message) => {
    set((state) => ({
      notifications: [...state.notifications, message],
    }));
  },

  
  clearNotifications: () => set({ notifications: [] }),

 
  checkSensorValue: (sensor, value) => {
    const thresholds = {
      temp: { min: 10, max: 40 },
      humidity: { min: 30, max: 70 },
      moist: { min: 300, max: 800 },
      light: { min: 200, max: 900 },
      co2: { min: 400, max: 1000 },
    };

    const { min, max } = thresholds[sensor] || {};

    if (min !== undefined && max !== undefined) {
      if (value < min) {
        console.log(`hello in min,${sensor},${value}`);
        
        get().addNotification(`${sensor} is too low: ${value}`);
      }
      if (value > max) {
        get().addNotification(`${sensor} is too high: ${value}`);
      }
    }
  },
}));
