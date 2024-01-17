import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProviders } from "@/components/provider/nextui-provider";
import AuthProvider from "@/components/provider/auth-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import ConvexClientProvider from "@/components/provider/convex-provider";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeartSteal AI",
  description: "Development by Nevir Studio",
  openGraph: {
    siteName: "HeartSteal Ai",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    title: `HeartSteal Ai`,
    description: `Nền tảng tạo ảnh bằng AI số một dành cho người Việt.`,
    type: "website",
    images: [
      "https://utfs.io/f/b011fb3f-58a2-4117-8e2c-300dcaacffed-k1ukaj.png",
    ],
  },
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
