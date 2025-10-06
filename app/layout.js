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
  <body className="font-sans bg-gradient-to-b from-blue-50 via-indigo-50 to-white text-blue-900">
    {/* Sticky Header */}
    <Header />

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {children}
    </main>

    {/* Footer */}
    <Footer />
  </body>
</html>
  );
}








