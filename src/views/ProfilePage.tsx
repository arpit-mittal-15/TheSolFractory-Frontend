"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  IconUser, 
  IconLock, 
  IconPhone, 
  IconMapPin, 
  IconLogout,
  IconEye,
  IconEyeOff
} from "@tabler/icons-react";
import { useUser } from "@/src/contexts/UserContext";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";

type TabType = "profile" | "password" | "phone" | "address";

export default function ProfilePage() {
  const { user, logout, refreshUserData, isAuthenticated } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Phone form state
  const [phoneForm, setPhoneForm] = useState({
    phoneNumber: "",
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    address: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
      });
      setPhoneForm({
        phoneNumber: user.phoneNumber || "",
      });
      setAddressForm({
        address: user.address || "",
      });
    }
  }, [user, isAuthenticated, router]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await AuthService.updateUser(user.id, {
        name: profileForm.name,
        email: profileForm.email,
      });
      await refreshUserData();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.changePassword(
        user.id,
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      toast.success("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await AuthService.updateUser(user.id, {
        phoneNumber: phoneForm.phoneNumber,
      });
      await refreshUserData();
      toast.success("Phone number updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update phone number");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await AuthService.updateUser(user.id, {
        address: addressForm.address,
      });
      await refreshUserData();
      toast.success("Address updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return null;
  }

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: IconUser },
    { id: "password" as TabType, label: "Password", icon: IconLock },
    { id: "phone" as TabType, label: "Phone", icon: IconPhone },
    { id: "address" as TabType, label: "Address", icon: IconMapPin },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center p-4 pt-8 pb-20 relative">
      <div className="liquid-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-liquid px-4 py-2 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition flex items-center gap-2"
            >
              <IconLogout className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-panel p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-widest transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "btn-liquid active text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-panel p-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-liquid active w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.current ? (
                      <IconEyeOff className="w-5 h-5" />
                    ) : (
                      <IconEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.new ? (
                      <IconEyeOff className="w-5 h-5" />
                    ) : (
                      <IconEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.confirm ? (
                      <IconEyeOff className="w-5 h-5" />
                    ) : (
                      <IconEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordForm.newPassword &&
                  passwordForm.confirmPassword &&
                  passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                  )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-liquid active w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition"
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          )}

          {/* Phone Tab */}
          {activeTab === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Phone Number</h2>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneForm.phoneNumber}
                  onChange={(e) => setPhoneForm({ phoneNumber: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="Enter your phone number"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-liquid active w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition"
              >
                {isLoading ? "Saving..." : "Save Phone Number"}
              </button>
            </form>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Address</h2>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Address
                </label>
                <textarea
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({ address: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60 min-h-[120px] resize-y"
                  placeholder="Enter your address"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-liquid active w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition"
              >
                {isLoading ? "Saving..." : "Save Address"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

