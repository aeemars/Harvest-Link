import { Role } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function sendChatMessage({
  role,
  sessionId,
  message,
  photo,
  onEvent,
}: {
  role: Role;
  sessionId: string;
  message: string;
  photo?: File | null;
  onEvent: (eventData: any) => void;
}): Promise<void> {
  const formData = new FormData();
  formData.append("message", message);
  formData.append("session_id", sessionId);
  if (photo) {
    formData.append("photo", photo);
  }

  const endpoint = role === "seller" ? `${API_BASE_URL}/chat/seller` : `${API_BASE_URL}/chat/buyer`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const parsed = JSON.parse(line.replace("data: ", ""));
          onEvent(parsed);
        } catch {
          // ignore partial JSON parse error
        }
      }
    }
  }
}
