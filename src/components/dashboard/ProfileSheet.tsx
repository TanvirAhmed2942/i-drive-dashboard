"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Lock, LogOut, Mail, Eye, EyeOff } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE_MB = 2;
const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/gif";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const defaultProfile: ProfileFormValues = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@evparking.com",
  phone: "+31 6 12345678",
};

function validateNewPassword(value: string): true | string {
  if (value.length < 8) return "Must be at least 8 characters.";
  if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter.";
  if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter.";
  if (!/\d/.test(value)) return "Must contain at least one number.";
  return true;
}

type ProfileSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProfileSheet({ open, onOpenChange }: ProfileSheetProps) {
  const router = useRouter();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: defaultProfile,
  });

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Save profile", data);
    onOpenChange(false);
  };

  const onPasswordSubmit = (data: PasswordFormValues) => {
    console.log("Change password", data);
    passwordForm.reset();
    onOpenChange(false);
  };

  const onLogout = () => {
    onOpenChange(false);
    router.push("/auth");
  };

  const onProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      profileForm.setError("root", { message: "File must be under 2MB." });
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.split(",").includes(file.type)) {
      profileForm.setError("root", { message: "Use JPG, PNG or GIF." });
      return;
    }
    const url = URL.createObjectURL(file);
    setProfilePhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col overflow-y-auto border-l border-white/10 bg-zinc-900/95 sm:max-w-md px-4"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Profile &amp; Account</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 py-2">
          {/* Profile Information */}
          <section className="space-y-4 rounded-lg bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <User className="size-5 text-zinc-400" />
              <h2 className="text-sm font-semibold text-white">
                Profile Information
              </h2>
            </div>

            <div className="flex items-start gap-4">
              <Avatar className="size-16 shrink-0 border-2 border-white/10">
                {profilePhotoUrl ? (
                  <AvatarImage src={profilePhotoUrl} alt="Profile" />
                ) : null}
                <AvatarFallback className="bg-white/10 text-lg text-white">
                  AU
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES}
                  className="hidden"
                  id="profile-photo"
                  onChange={onProfilePhotoChange}
                />
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    document.getElementById("profile-photo")?.click()
                  }
                >
                  Change Profile Photo
                </Button>
                <span className="text-xs text-zinc-500">
                  JPG, PNG or GIF, Max 2MB
                </span>
              </div>
            </div>

            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-zinc-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  className="border-white/20 bg-white/5 text-white placeholder:text-zinc-500"
                  {...profileForm.register("firstName", { required: "Required" })}
                />
                {profileForm.formState.errors.firstName && (
                  <p className="text-xs text-red-400">
                    {profileForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-zinc-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  className="border-white/20 bg-white/5 text-white placeholder:text-zinc-500"
                  {...profileForm.register("lastName", { required: "Required" })}
                />
                {profileForm.formState.errors.lastName && (
                  <p className="text-xs text-red-400">
                    {profileForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    className="border-white/20 bg-white/5 pl-9 text-white placeholder:text-zinc-500"
                    {...profileForm.register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
                {profileForm.formState.errors.email && (
                  <p className="text-xs text-red-400">
                    {profileForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  className="border-white/20 bg-white/5 text-white placeholder:text-zinc-500"
                  {...profileForm.register("phone")}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={profileForm.formState.isSubmitting}
                >
                  Save Profile
                </Button>
              </div>
            </form>
          </section>

          <Separator className="bg-white/10" />

          {/* Change Password */}
          <section className="space-y-4 rounded-lg bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <Lock className="size-5 text-zinc-400" />
              <h2 className="text-sm font-semibold text-white">
                Change Password
              </h2>
            </div>

            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-zinc-300">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    className="border-white/20 bg-white/5 pr-9 text-white placeholder:text-zinc-500"
                    placeholder="••••••••"
                    {...passwordForm.register("currentPassword", {
                      required: "Required",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    onClick={() => setShowCurrentPassword((s) => !s)}
                    aria-label={showCurrentPassword ? "Hide" : "Show"}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-xs text-red-400">
                    {passwordForm.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-zinc-300">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="border-white/20 bg-white/5 pr-9 text-white placeholder:text-zinc-500"
                    placeholder="••••••••"
                    {...passwordForm.register("newPassword", {
                      required: "Required",
                      validate: validateNewPassword,
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    onClick={() => setShowNewPassword((s) => !s)}
                    aria-label={showNewPassword ? "Hide" : "Show"}
                  >
                    {showNewPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-500">
                  Must be at least 8 characters with uppercase, lowercase, and
                  numbers.
                </p>
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-xs text-red-400">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword" className="text-zinc-300">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="border-white/20 bg-white/5 pr-9 text-white placeholder:text-zinc-500"
                    placeholder="••••••••"
                    {...passwordForm.register("confirmNewPassword", {
                      required: "Required",
                      validate: (value) =>
                        value === passwordForm.getValues("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={showConfirmPassword ? "Hide" : "Show"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmNewPassword && (
                  <p className="text-xs text-red-400">
                    {passwordForm.formState.errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-zinc-600 text-white hover:bg-zinc-500"
                  disabled={passwordForm.formState.isSubmitting}
                >
                  Change Password
                </Button>
              </div>
            </form>
          </section>

          <Separator className="bg-white/10" />

          {/* Logout */}
          <section className="space-y-3 rounded-lg bg-white/5 p-4">
            <h2 className="text-sm font-semibold text-white">Logout</h2>
            <p className="text-sm text-zinc-400">
              Sign out from your admin account
            </p>
            <Button
              type="button"
              variant="destructive"
              className="w-full gap-2 bg-red-600 hover:bg-red-700"
              onClick={onLogout}
            >
              <LogOut className="size-4" />
              Logout
            </Button>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
