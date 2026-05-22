// Chatbot.jsx
import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-72 h-96 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <span>Chatbot</span>
            <button onClick={() => setIsOpen(false)}>✖️</button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700">
            <p className="mb-2">Hello! How can I help you today?</p>
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-200">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
