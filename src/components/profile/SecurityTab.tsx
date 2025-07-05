"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AccountSecurityTab() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log({
      oldPassword,
      newPassword,
    });

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggle2FA = () => {
    setTwoFAEnabled((prev) => !prev);
    alert("two factor authentication enabled");
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <div className="border-t border-gray-200 pt-6 dark:border-gray-800"></div>
        <h2 className="mb-2 text-lg font-semibold">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <Label className="mt-5 mb-2">Old Password</Label>
            <Input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="mb-2">New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="mb-2">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="cursor-pointer bg-purple-600 hover:bg-purple-700"
          >
            Update Password
          </Button>
        </form>
      </div>

      <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
        <h2 className="mb-2 text-lg font-semibold">
          Two-Factor Authentication
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {twoFAEnabled
              ? "2FA is enabled for your account."
              : "2FA is currently disabled."}
          </span>
          <div className="flex items-center gap-2">
            <Switch
              checked={twoFAEnabled}
              onCheckedChange={handleToggle2FA}
              className="cursor-pointer"
            />
            <span className="text-sm">{twoFAEnabled ? "On" : "Off"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
