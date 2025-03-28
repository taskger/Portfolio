import { signIn,signOut } from "next-auth/react";

export const login = async () => {
  await signIn("github", { redirect: true, callbackUrl: "/admin" });
};
export const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };