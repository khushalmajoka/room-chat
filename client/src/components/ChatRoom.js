import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  const roomId = useSelector((state) => state.room.roomId);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = { text: message, from: socketRef.current.id };
      setMessages([...messages, messageData]);
      socketRef.current.emit("send-message", {
        roomId,
        text: message,
        from: socketRef.current.id,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");
    socketRef.current.emit("join-room", roomId);

    socketRef.current.on("receive-message", (data) => {
      console.log(data, socketRef.current);
      if (data.from !== socketRef.current.id)
        setMessages((list) => [...list, data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, socketRef]);

  return (
    <div className="flex flex-col w-1/4 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-blue-500 text-white text-center font-bold py-2 rounded-t-lg">
        Room Chat
      </div>

      <div className="h-96 overflow-y-auto p-4 flex flex-col space-y-2 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs md:max-w-md break-words ${
              msg.from === socketRef.current.id
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center p-3 bg-gray-200 rounded-b-lg">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
