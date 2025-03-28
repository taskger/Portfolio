"use client"; // Ensures it runs on the client side

import { SessionProvider } from "next-auth/react";

export default function SessionProviderGithub({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
