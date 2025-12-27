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
  IconEyeOff,
  IconCreditCard,
} from "@tabler/icons-react";
import { useUser } from "@/src/contexts/UserContext";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";

type TabType = "profile" | "password" | "phone" | "address" | "payment";

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

  // Address form state - now structured
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  // Payment form state (we do NOT store raw card numbers/CVV here) - only masked info sent to backend.
  const [paymentForm, setPaymentForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardBrand: "",
    last4: "",
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

    // Address
    if (typeof user.address === "string") {
      // setAddressForm((s) => ({ ...s, street: user.address || "" }));
    } else if (user.address && typeof user.address === "object") {
      const address = user.address;
      setAddressForm({
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        pincode: address.pincode || "",
      });
    }

    // Payment info
    if (user.paymentInfo && typeof user.paymentInfo === "object") {
      const payment: any = user.paymentInfo; // <-- store typed variable
      setPaymentForm((p) => ({
        ...p,
        cardHolderName: payment.cardHolderName || "",
        cardBrand: payment.cardBrand || "",
        last4: payment.last4 || "",
        expiryMonth: payment.expiryMonth || "",
        expiryYear: payment.expiryYear || "",
      }));
    }
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
      // Send structured address object to backend. Make sure your backend schema supports this.
      await AuthService.updateUser(user.id, {
        address: {
          street: addressForm.street,
          city: addressForm.city,
          state: addressForm.state,
          country: addressForm.country,
          pincode: addressForm.pincode,
        },
      });
      await refreshUserData();
      toast.success("Address updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update address");
    } finally {
      setIsLoading(false);
    }
  };

  // Simple card brand detection and last4 extraction — replace with payment provider tokenization in production.
  const detectCardBrand = (number: string) => {
    const n = number.replace(/\s+/g, "");
    if (/^4/.test(n)) return "Visa";
    if (/^5[1-5]/.test(n)) return "Mastercard";
    if (/^3[47]/.test(n)) return "American Express";
    return "Unknown";
  };

  const handleCardNumberChange = (val: string) => {
    const sanitized = val.replace(/[^0-9]/g, "");
    const last4 = sanitized.slice(-4);
    const brand = detectCardBrand(sanitized);
    setPaymentForm((p) => ({ ...p, cardNumber: val, last4, cardBrand: brand }));
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // SECURITY: Do NOT store raw card numbers or CVV in your database. Use a PCI-compliant tokenization flow (Stripe, Braintree, etc.)
    // Here we only send masked data (brand + last4 + expiry + cardholder) to backend as an example. Replace with tokenization.

    setIsLoading(true);
    try {
      const paymentPayload = {
        cardHolderName: paymentForm.cardHolderName,
        cardBrand: paymentForm.cardBrand,
        last4: paymentForm.last4,
        expiryMonth: paymentForm.expiryMonth,
        expiryYear: paymentForm.expiryYear,
        // optionally attach billing address (structured)
        billingAddress: {
          street: addressForm.street,
          city: addressForm.city,
          state: addressForm.state,
          country: addressForm.country,
          pincode: addressForm.pincode,
        },
      };

      await AuthService.updateUser(user.id, {
        paymentInfo: paymentPayload,
      });

      await refreshUserData();
      toast.success("Payment info saved (masked). Replace with tokenization in production.");
      // Clear sensitive local fields (cardNumber/cvv)
      setPaymentForm((p) => ({ ...p, cardNumber: "", cvv: "" }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save payment info");
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
    { id: "payment" as TabType, label: "Payment", icon: IconCreditCard },
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

          {/* Address Tab (structured inputs) */}
          {activeTab === "address" && (
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Address</h2>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Street</label>
                <input
                  type="text"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="House, building, street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">State</label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="State/Province"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/[^0-9]/g, "") })}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="Postal / ZIP code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Country</label>
                <input
                  type="text"
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="Country"
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

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Information</h2>

              <p className="text-xs text-gray-400">We do not store raw card numbers or CVV — use a payment provider tokenization in production.</p>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentForm.cardHolderName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardHolderName: e.target.value })}
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="Name on card"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Card Number</label>
                <input
                  type="text"
                  value={paymentForm.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  inputMode="numeric"
                  className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Expiry Month</label>
                  <input
                    type="text"
                    value={paymentForm.expiryMonth}
                    onChange={(e) => setPaymentForm({ ...paymentForm, expiryMonth: e.target.value.replace(/[^0-9]/g, "") })}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Expiry Year</label>
                  <input
                    type="text"
                    value={paymentForm.expiryYear}
                    onChange={(e) => setPaymentForm({ ...paymentForm, expiryYear: e.target.value.replace(/[^0-9]/g, "") })}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="YY"
                    maxLength={4}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">CVV</label>
                  <input
                    type="password"
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/[^0-9]/g, "") })}
                    className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
                    placeholder="CVV"
                    maxLength={4}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Card Brand / Last4</label>
                  <div className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-white">
                    {paymentForm.cardBrand} {paymentForm.last4 ? `•${paymentForm.last4}` : ""}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-liquid active w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition"
              >
                {isLoading ? "Saving..." : "Save Payment Info"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
