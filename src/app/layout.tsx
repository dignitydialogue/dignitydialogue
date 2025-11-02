import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DignityDialogue - Telephone Companionship for Seniors",
  description: "Providing compassionate telephone companionship to isolated seniors. Lending an Ear, Mending a Heart.",
  keywords: ["senior care", "telephone companionship", "elderly support", "loneliness solution", "compassionate care"],
  authors: [{ name: "DignityDialogue" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "DignityDialogue",
    description: "Providing compassionate telephone companionship to isolated seniors. Lending an Ear, Mending a Heart.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DignityDialogue",
    description: "Providing compassionate telephone companionship to isolated seniors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-poppins antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
