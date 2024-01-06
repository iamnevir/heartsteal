import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProviders } from "@/components/provider/nextui-provider";
import AuthProvider from "@/components/provider/auth-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import ConvexClientProvider from "@/components/provider/convex-provider";
import { Toaster } from "sonner";
import { Lenify } from "@/components/lenis";

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
                <Lenify />
                {children}{" "}
                <Toaster
                  toastOptions={{
                    style: {
                      backgroundImage: `linear-gradient(
                                        122deg,
                                        rgb(250, 85, 96) 0.01%,
                                        rgb(177, 75, 244) 49.9%,
                                        rgb(77, 145, 255) 100%
                                      )`,
                      border: "0px",
                    },
                  }}
                />
              </NextUiProviders>
            </EdgeStoreProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
