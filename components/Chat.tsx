"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const stockExamples = [
  { question: "Tell me how's the NASDAQ market" },
  { question: "Recent stock trends for TSLA" },
  { question: "Owner of TSLA" },
];

export default function AIStockChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `Here's some information about ${input}: [AI response placeholder]`,
          },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Stock Assistant</h1>

      <div className="rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.role === "user" ? "" : ""
            } max-w-[80%]`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {stockExamples.map((stock) => (
          <Card
            key={stock.question}
            className="p-2  bg-transparent shadow-black"
          >
            <CardContent className="p-2">
              <h2 className="font-bold text-sm">{stock.question}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2 max-w-2xl">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about stocks..."
          className="flex-grow"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
}
