"use client";

import { IconUserFilled } from "@tabler/icons-react";
import { useUser } from "@/src/contexts/UserContext";
import { useRouter } from "next/navigation";

export function UserProfileDialog() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  const handleClick = () => {
    router.push("/profile");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="relative group btn-liquid active w-9.75 h-9.75 flex items-center justify-center rounded-full transition"
      aria-label="User profile"
    >
      <IconUserFilled className="w-6 h-6 text-white" />
    </button>
  );
}

