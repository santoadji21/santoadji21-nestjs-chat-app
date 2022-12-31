import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const API_URL = "http://localhost:3000";

const socket = io(API_URL);

function App() {
  const [message, setMessages] = useState("");
  const [name, setName] = useState("");

  interface Message {
    name: string;
    message: string;
    created_at: string;
    id: string;
  }

  const [getMessages, setGetMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data: Message) => {
      setGetMessages((getMessages) => [...getMessages, data]);
    });
    return () => {
      fetch(`${API_URL}/api/chat`)
        .then((response) => response.json())
        .then((data) => setGetMessages(data));
    };
  }, [socket]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    socket.emit("message", { name, message });
    setMessages("");
  };
  useEffect(() => {}, [getMessages]);
  const newGetMessage = [...new Set(getMessages)];

  return (
    <div className="h-96 flex flex-col flex-grow w-full  bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col w-96 flex-grow h-0 p-4 overflow-auto">
        {newGetMessage.map((message: Message, index: Number) => (
          <div
            className="flex w-full mt-2 space-x-3 max-w-xs"
            key={`${message.message}+${index}`}
          >
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-8 h-8 border border-indigo-400">
                <span className="text-xs">
                  {message.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">{message.message}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                {dayjs(message.created_at).format("h:mm A")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-300 p-4">
        <form onSubmit={sendMessage}>
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
          <input
            className="flex my-3 items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            value={message}
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Type your message…"
          />
        </form>
      </div>
    </div>
  );
}

export default App;
