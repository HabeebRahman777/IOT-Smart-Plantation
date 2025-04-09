import React from 'react'
import { useState } from "react";
import { Bell, X } from "lucide-react";
import plant from "../assets/plant.png" 
import { useNotificationStore } from '../store/useNotificationStore';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const notifications = useNotificationStore((state) => state.notifications)

    return (
        <div>
          {/* Navbar */}
          <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white flex items-center justify-between px-6 py-4 shadow-md z-50">
            {/* Left: Logo & Name */}
            <div className="flex items-center space-x-2">
              <img src={plant} alt="Plant Icon" className="h-8 w-8" />
              <span className="text-xl font-semibold">Saffron</span>
            </div>
    
            {/* Right: Notification Bell */}
            <div className="relative cursor-pointer" onClick={() => setIsOpen(true)}>
              <Bell className="h-6 w-6 text-white" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>
          </nav>
    
          {/* Sidebar for Notifications */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform z-50 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-800">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
    
            {/* Notification List */}
            <div className="p-4 space-y-2">
              {notifications.length > 0 ? (
                notifications.map((note, index) => (
                  <div key={index} className="bg-gray-700 p-2 rounded-md text-sm">
                    {note}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No new notifications</p>
              )}
            </div>
          </div>
    
          {/* Overlay (closes sidebar when clicked) */}
          {isOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      );
}

export default Navbar