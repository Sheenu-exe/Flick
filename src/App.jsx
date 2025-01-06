import { useState } from "react";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
import { Chat } from "./components/Chat";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-base-200 to-base-100">
          <div className="w-full max-w-md space-y-8 rounded-lg bg-base-100 p-8 shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Join a Room</h2>
              <p className="mt-2 text-base-content/60">Enter a room name to start chatting</p>
            </div>
            <div className="space-y-4">
              <input
                className="input input-bordered w-full"
                placeholder="Room name..."
                onChange={(e) => setRoom(e.target.value)}
              />
              <button
                className="btn btn-primary w-full"
                onClick={() => setIsInChat(true)}
                disabled={!room.trim()}
              >
                Join Chat Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
