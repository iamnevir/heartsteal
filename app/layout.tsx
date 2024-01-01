import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProviders } from "@/components/provider/nextui-provider";
import AuthProvider from "@/components/provider/auth-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import ConvexClientProvider from "@/components/provider/convex-provider";
import { Toaster } from "@/components/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeartSteal AI",
  description: "Development by Nevir Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            <EdgeStoreProvider>
              <NextUiProviders>
                {children} <Toaster />
              </NextUiProviders>
            </EdgeStoreProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
