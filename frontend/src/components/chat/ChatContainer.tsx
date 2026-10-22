import React, { useRef, useEffect } from "react";
import { ChatMessageItem } from "@/lib/types";
import { ChatMessage } from "./ChatMessage";

interface ChatContainerProps {
  messages: ChatMessageItem[];
  isLoading?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading = false,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#EFEAE2]">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-2">
          <div className="bg-white rounded-lg px-3 py-2 text-xs text-gray-500 italic shadow-sm flex items-center space-x-1">
            <span className="animate-pulse">HarvestLink agent is typing...</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
