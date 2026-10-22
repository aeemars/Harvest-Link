import React from "react";
import { ChatMessageItem } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessageItem;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";
  const isSystem = message.sender === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-lg px-3 py-2 shadow-sm relative text-sm ${
          isUser
            ? "bg-[#DCF8C6] text-gray-900 rounded-tr-none"
            : "bg-white text-gray-900 rounded-tl-none border border-gray-100"
        }`}
      >
        {message.photoUrl && (
          <img
            src={message.photoUrl}
            alt="Produce"
            className="rounded mb-2 max-h-48 w-full object-cover"
          />
        )}
        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        <span className="block text-[10px] text-gray-500 text-right mt-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
