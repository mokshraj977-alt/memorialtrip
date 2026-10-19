import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MemorialTrip | Journeys made personal",
  description:
    "Explore MemorialTrip destinations in this independent redesign demo. Package details and enquiry interactions are for demonstration only.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
