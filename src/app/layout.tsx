import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MemorialTrip | Journeys made personal",
  description:
    "Discover MemorialTrip journeys across India and beyond. Explore destinations and find a trip to look forward to.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
