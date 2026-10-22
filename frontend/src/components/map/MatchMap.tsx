import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LatLng } from "@/lib/types";

// Dynamically load Leaflet map components without SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MatchMapProps {
  sellerLocation?: LatLng;
  buyerLocation?: LatLng;
}

export const MatchMap: React.FC<MatchMapProps> = ({
  sellerLocation = { lat: 25.2048, lng: 55.2708 }, // Dubai default coordinates
  buyerLocation,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
        Loading match map...
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] relative rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        center={[sellerLocation.lat, sellerLocation.lng]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[sellerLocation.lat, sellerLocation.lng]}>
          <Popup>
            <span className="font-semibold text-xs">Seller Location</span>
          </Popup>
        </Marker>
        {buyerLocation && (
          <Marker position={[buyerLocation.lat, buyerLocation.lng]}>
            <Popup>
              <span className="font-semibold text-xs">Matched Buyer Location</span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
