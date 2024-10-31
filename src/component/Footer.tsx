import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div className="w-full fixed bottom-[2px] px-2 max-w-[700px] z-50">
      <div className="grid grid-cols-5 gap-1 px-3 lg:gap-5 justify-center items-center bg-[#272A30] pt-3 pb-2 lg:px-4 rounded-3xl w-full border-slate-700 border-2">
        <Link
          to=""
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/"
              ? "scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl"
              : "opacity-50 text-white"
          }`}
        >
          <img
            src="/image/earn.png"
            alt="play"
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <p className="text-[10px] lg:text-sm text-white">Earn</p>
        </Link>
        <Link
          to="/leaderboard"
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/leaderboard"
              ? "scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl"
              : "opacity-50 text-white"
          }`}
        >
          <img
            src="/image/leaderboard.png"
            alt="play"
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <p className="text-[10px] lg:text-sm text-white">Leaderboard</p>
        </Link>
        <Link
          to="/friends"
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/friends"
              ? "scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl"
              : "opacity-50 text-white"
          }`}
        >
          <img
            src="/image/friends.png"
            alt="play"
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <p className="text-[10px] lg:text-sm text-white">Friends</p>
        </Link>
        <Link
          to="/tasks"
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/tasks"
              ? "scale-[110%] opacity-100  bg-transparent p-1 lg:p-2 rounded-2xl"
              : "opacity-50 text-white"
          }`}
        >
          <img
            src="/image/tick.png"
            alt="quest"
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <p className="text-[10px] lg:text-sm text-white">Tasks</p>
        </Link>
        <Link
          to="/airdrop"
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/airdrop"
              ? "scale-[110%] opacity-100  bg-transparent p-1 lg:p-2 rounded-2xl"
              : "opacity-50 text-white"
          }`}
        >
          <img
            src="/image/dollar.png"
            alt="quest"
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <p className="text-[10px] lg:text-sm text-white">Airdrop</p>
        </Link>
      </div>
    </div>
  );
}
