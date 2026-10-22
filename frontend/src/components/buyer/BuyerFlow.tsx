import React, { useState } from "react";
import { ChatContainer } from "../chat/ChatContainer";
import { ChatInput } from "../chat/ChatInput";
import { ChatMessageItem } from "@/lib/types";

export const BuyerFlow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: "intro-b-1",
      sender: "agent",
      text: "👋 Welcome to HarvestLink Buyer portal! You'll receive discount surplus produce alerts here, review Careem Box delivery quotes, and confirm instant orders.",
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    // Boilerplate placeholder: integration to be implemented in Phase 3
    const newMsg: ChatMessageItem = {
      id: String(Date.now()),
      sender: "user",
      text,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-[#EFEAE2]">
      <div className="bg-whatsapp-darkGreen text-white p-3 flex items-center justify-between shadow">
        <div>
          <h2 className="font-semibold text-sm">Buyer Deals & Delivery (Careem Box)</h2>
          <p className="text-[11px] text-green-100">Nearby restaurants & kitchens</p>
        </div>
      </div>
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput
        onSendMessage={(text) => handleSendMessage(text)}
        disabled={isLoading}
        placeholder="Reply to offer or confirm delivery..."
      />
    </div>
  );
};
