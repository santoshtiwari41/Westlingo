import { BookOpen, LogOut, Settings, User2 } from "lucide-react";

type User = { name: string; image?: string | null };

export default function UserActions({
  user,
  isPending,
  handlelogin,
  handleregister,
  handleProfile,
  handleSettings,
  handleBookings,
  handleLogout,
}: {
  user: User | null | undefined;
  isPending: boolean;
  handlelogin: () => void;
  handleregister: () => void;
  handleProfile: () => void;
  handleSettings: () => void;
  handleBookings: () => void;
  handleLogout: () => void;
}) {
  if (isPending) return null;

  if (user) {
    return (
      <div className="group relative">
        <button className="flex cursor-pointer items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 font-medium text-purple-700 hover:bg-purple-100">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-800 font-bold text-white">
            {user.name?.[0]}
          </span>
          <span className="font-medium">{user.name}</span>
        </button>
        <div className="animate-fade-in invisible absolute right-0 z-50 mt-2 w-56 rounded-xl border border-purple-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="py-2">
            <button
              onClick={handleProfile}
              className="flex w-full cursor-pointer items-center gap-3 rounded-md px-5 py-2.5 text-left text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <User2 size={18} className="text-gray-500" />
              <span> Profile</span>
            </button>
            <button
              onClick={handleSettings}
              className="flex w-full cursor-pointer items-center gap-3 rounded-md px-5 py-2.5 text-left text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <Settings size={18} className="text-gray-500" />
              <span> Settings</span>
            </button>
            <button
              onClick={handleBookings}
              className="flex w-full cursor-pointer items-center gap-3 rounded-md px-5 py-2.5 text-left text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <BookOpen size={18} className="text-gray-500" />
              <span>My Bookings</span>
            </button>
            <div className="my-2 border-t border-purple-100"></div>
            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-md px-5 py-2.5 text-left text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} className="text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleregister}
        className="cursor-pointer rounded-full border border-purple-600 bg-white px-3 py-1 font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50 hover:text-purple-700"
      >
        Register
      </button>
      <button
        onClick={handlelogin}
        className="cursor-pointer rounded-full border border-purple-600 bg-purple-600 px-3 py-1 font-semibold text-white shadow-sm transition hover:bg-purple-700"
      >
        Sign in
      </button>
    </>
  );
}
