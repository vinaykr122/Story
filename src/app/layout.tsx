import type { Metadata } from "next";
import { Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "❤️ Vinay & Varshu – Our Story ❤️",
  description: "A digital love museum, memory album, and emotional journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden cursor-none">
        <AudioProvider>
          <CustomCursor />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
