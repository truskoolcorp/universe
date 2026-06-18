import "./globals.css";

export const metadata = {
  title: "The Tru Skool® Universe",
  description:
    "One front door for the whole Tru Skool® ecosystem — fashion, music, travel, real estate, café culture, and AI tools. Find your lane.",
  openGraph: {
    title: "The Tru Skool® Universe",
    description: "Every brand we build, one front door. Culture. Commerce. Code.",
    siteName: "Tru Skool® Entertainment",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
