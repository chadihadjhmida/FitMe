import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const { navigate } = useContext(ShopContext);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...messages, userMessage],
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.answer,
          product: data.product_id ? data : null,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong 😕" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white w-14 h-14 rounded-full 
                     shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:shadow-lg transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl
             border border-gray-800
             shadow-[0_20px_50px_rgba(0,0,0,0.35)]
             flex flex-col h-[600px]"
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <span className="font-semibold text-lg">Your Shopping Friend</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-white text-gray-900 border"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {msg.product && (
                    <div className="mt-3 bg-white rounded-lg border shadow-sm overflow-hidden">
                      <img
                        src={msg.product.product_image}
                        alt={msg.product.product_name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <p className="font-semibold text-sm">
                          {msg.product.product_name}
                        </p>
                        <button
                          onClick={() =>
                            navigate(`/product/${msg.product.product_id}`)
                          }
                          className="mt-2 w-full bg-black text-white text-xs py-2 rounded-lg hover:opacity-90"
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && <p className="text-sm text-gray-400">Typing...</p>}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Search streetwear..."
              className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-4 rounded-xl text-sm hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
