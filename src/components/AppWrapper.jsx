import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { Moon, Sun, LogOut } from "lucide-react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <nav className="fixed top-0 z-50 w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center space-x-2 text-xl font-bold">
            <span>Flick Chat</span>
          </a>
          <div className="flex items-center space-x-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <Sun className="h-5 w-5" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow-xl">
                {["light", "dark", "cupcake", "forest", "synthwave"].map((theme) => (
                  <li key={theme}>
                    <button
                      className="btn btn-ghost justify-start capitalize"
                      onClick={() => document.documentElement.setAttribute("data-theme", theme)}
                    >
                      {theme}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {isAuth && (
              <button className="btn btn-ghost btn-circle" onClick={signUserOut}>
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-16">{children}</main>
    </div>
  );
};
