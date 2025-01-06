import { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase.config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { SendHorizontal } from "lucide-react";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const bottomRef = useRef();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="flex h-screen flex-col bg-base-100">
      <div className="border-b border-base-200 bg-base-100/80 px-4 py-3 backdrop-blur-md">
        <h1 className="text-lg font-semibold">
          Room: <span className="text-primary">{room}</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.user === auth.currentUser.displayName;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  <div className="text-sm font-medium opacity-80">{message.user}</div>
                  <div className="mt-1">{message.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-base-200 bg-base-100/80 p-4 backdrop-blur-md"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered flex-1"
          />
          <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
