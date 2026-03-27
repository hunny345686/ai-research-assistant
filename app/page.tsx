"use client";

import { useState } from "react";

export default function ChatPage() {

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input })
    });

    const reader = res.body?.getReader();

    const decoder = new TextDecoder();

    let result = "";

    while (true) {
      const { done, value } = await reader!.read();

      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;

      setResponse(result); // live update
    }
    setInput("")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl  border shadow-2xl rounded-2xl p-6 border-amber-50">

        {/* Header */}
        <h1 className="text-xl font-semibold  mb-4">
          AI Assistant
        </h1>

        {/* Response Box */}
        <div className="h-64 overflow-y-auto border border-amber-50 rounded-xl p-4 whitespace-pre-wrap">
          {response || "Your response will appear here..."}
        </div>

        {/* Input Area */}
        <div className="mt-4 flex items-end gap-3">
          <textarea
            className="flex-1 resize-none border border-amber-50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white outline-amber-50"
            rows={3}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}