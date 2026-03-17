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
      console.log(done, value)

      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;

      setResponse(result); // live update
    }
  }

  return (
    <div className="p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <div className="mt-4 whitespace-pre-wrap">
        {response}
      </div>
    </div>
  );
}