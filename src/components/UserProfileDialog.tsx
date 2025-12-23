"use client";

import { useState, useRef, useEffect } from "react";
import { IconUserFilled, IconLogout, IconX } from "@tabler/icons-react";
import { useUser } from "@/src/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export function UserProfileDialog() {
  const { user, logout, isAuthenticated } = useUser();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (isMobile) return; // Don't use hover on mobile
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Don't use hover on mobile
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Small delay to allow moving to dialog
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="relative" ref={dialogRef}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative group btn-liquid active w-9.75 h-9.75 flex items-center justify-center rounded-full transition"
        aria-label="User profile"
      >
        <IconUserFilled className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="dialog-card absolute right-0 w-80 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            marginTop: "0.5rem",
          }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Profile</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.name}</p>
                  <p className="text-gray-400 text-sm truncate">{user.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Email
                  </p>
                  <p className="text-white text-sm">{user.email}</p>
                </div>

                {user.phoneNumber && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Phone
                    </p>
                    <p className="text-white text-sm">
                      {user.phoneNumber || "Not provided"}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    User ID
                  </p>
                  <p className="text-white text-xs font-mono break-all">
                    {user.id}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-4 btn-liquid py-3 px-4 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition flex items-center justify-center gap-2"
              >
                <IconLogout className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

