export type Role = "seller" | "buyer";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface ChatMessageItem {
  id: string;
  sender: "user" | "agent" | "system";
  text: string;
  timestamp: string;
  photoUrl?: string;
  metadata?: {
    produce?: string;
    grade?: "A" | "B" | "C";
    shelfLifeHours?: number;
    retailPrice?: number;
    rescuePrice?: number;
    quote?: {
      cctId: string;
      vehicle: string;
      price: number;
      currency: string;
    };
    orderId?: string;
  };
}

export interface BuyerProfile {
  buyerId: string;
  name: string;
  type: "restaurant" | "household" | "kitchen";
  location: LatLng;
  wantedProduce: string[];
}

export interface ProduceListing {
  listingId: string;
  sellerId: string;
  produce: string;
  quantityKg: number;
  grade: "A" | "B" | "C";
  retailPrice: number;
  rescuePrice: number;
  status: "Open" | "Matched" | "Delivered" | "Expired";
}
