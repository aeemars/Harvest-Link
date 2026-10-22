"use client";

import React, { useState } from "react";
import { SellerFlow } from "@/components/seller/SellerFlow";
import { BuyerFlow } from "@/components/buyer/BuyerFlow";
import { MatchMap } from "@/components/map/MatchMap";
import { Sprout, ShoppingBag, MapPin } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"seller" | "buyer">("seller");
  const [showMap, setShowMap] = useState(false);

  return (
    <main className="h-screen w-screen flex flex-col bg-[#D1D7DB] overflow-hidden">
      {/* Top App Header */}
      <header className="bg-whatsapp-teal text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-full">
            <Sprout className="h-5 w-5 text-whatsapp-green" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">HarvestLink</h1>
            <p className="text-xs text-green-100">Surplus Produce Rescue Agent</p>
          </div>
        </div>

        {/* Tab & Map Controls */}
        <div className="flex items-center space-x-2">
          <div className="bg-whatsapp-darkGreen p-1 rounded-lg flex space-x-1">
            <button
              onClick={() => setActiveTab("seller")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                activeTab === "seller"
                  ? "bg-white text-whatsapp-teal shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Sprout size={14} />
              <span>Seller</span>
            </button>
            <button
              onClick={() => setActiveTab("buyer")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                activeTab === "buyer"
                  ? "bg-white text-whatsapp-teal shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <ShoppingBag size={14} />
              <span>Buyer</span>
            </button>
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className={`p-2 rounded-lg text-xs font-medium flex items-center space-x-1 transition ${
              showMap
                ? "bg-careem-green text-gray-900 font-semibold"
                : "bg-whatsapp-darkGreen text-white hover:bg-whatsapp-darkGreen/80"
            }`}
            title="Toggle Match & Delivery Map"
          >
            <MapPin size={16} />
            <span className="hidden sm:inline">Map</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto p-0 sm:p-4 gap-4">
        {/* Chat Interface (WhatsApp-style) */}
        <div className="flex-1 flex flex-col bg-white rounded-none sm:rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {activeTab === "seller" ? <SellerFlow /> : <BuyerFlow />}
        </div>

        {/* Optional Split-Screen Map */}
        {showMap && (
          <div className="hidden md:flex md:w-1/3 flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-2">
            <div className="px-2 py-1 flex items-center justify-between text-xs text-gray-600 font-semibold mb-2">
              <span>Live Delivery Match Map</span>
              <span className="text-careem-dark bg-careem-green px-2 py-0.5 rounded text-[10px]">
                Careem Box
              </span>
            </div>
            <div className="flex-1">
              <MatchMap />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
