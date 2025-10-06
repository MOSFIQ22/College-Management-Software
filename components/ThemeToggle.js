import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ABC College",
  description: "ABC College official website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main className="max-w-7xl mx-auto px-7 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

