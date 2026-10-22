import React, { useState } from "react";
import { ChatContainer } from "../chat/ChatContainer";
import { ChatInput } from "../chat/ChatInput";
import { ChatMessageItem } from "@/lib/types";

export const SellerFlow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: "intro-1",
      sender: "agent",
      text: "👋 Welcome to HarvestLink Seller portal! Send a photo of your surplus produce with quantity and notes (e.g., '40 kg tomatoes, very ripe'). I will inspect it, check retail prices via Careem Groceries, and price it for fast sale.",
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text: string, photo?: File) => {
    // Boilerplate placeholder: integration to be implemented in Phase 3
    const newMsg: ChatMessageItem = {
      id: String(Date.now()),
      sender: "user",
      text,
      timestamp: "Just now",
      photoUrl: photo ? URL.createObjectURL(photo) : undefined,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-[#EFEAE2]">
      <div className="bg-whatsapp-teal text-white p-3 flex items-center justify-between shadow">
        <div>
          <h2 className="font-semibold text-sm">Seller Assistant (HarvestLink)</h2>
          <p className="text-[11px] text-green-100">Careem MCP & Claude Vision connected</p>
        </div>
      </div>
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder="Send photo or note (e.g. 40kg tomatoes, ripe)..."
      />
    </div>
  );
};
