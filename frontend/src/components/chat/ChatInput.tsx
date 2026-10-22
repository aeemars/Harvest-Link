import React, { useState, useRef } from "react";
import { Send, Camera, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string, photo?: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
}) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !photo) return;
    onSendMessage(text, photo || undefined);
    setText("");
    clearPhoto();
  };

  return (
    <div className="bg-[#F0F2F5] p-3 border-t border-gray-200">
      {previewUrl && (
        <div className="relative inline-block mb-2">
          <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded border" />
          <button
            type="button"
            onClick={clearPhoto}
            className="absolute -top-1 -right-1 bg-gray-700 text-white rounded-full p-0.5 text-xs hover:bg-black"
          >
            <X size={12} />
          </button>
        </div>
      )}
      <form onSubmit={handleSend} className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handlePhotoSelect}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <Camera size={20} />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-whatsapp-teal border border-gray-300"
        />

        <button
          type="submit"
          disabled={disabled || (!text.trim() && !photo)}
          className="bg-whatsapp-darkGreen hover:bg-whatsapp-teal text-white p-2 rounded-full disabled:opacity-40 transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
