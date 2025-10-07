"use client";
import Link from "next/link";
import { useState } from "react";


const navLinks = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Faculty", href: "#faculty" },
  { label: "Admission", href: "#admission" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow">
            AC
          </div>
          <span className="text-lg font-semibold text-gray-800">
            ABC College
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                link.isButton
                  ? "bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
                  : "text-gray-700 hover:text-indigo-600 transition"
              }
            >
              {link.label}
            </a>
          ))}
          
          {/* Login & Register */}
          {/*   <Link
           href="/login"
            className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
            Login
         </Link> */}
          <Link
             href="/register"
             className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition font-medium"
              >
             Register
          </Link>
         
      </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={
                link.isButton
                  ? "block bg-indigo-600 text-white text-center px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
                  : "block text-gray-700 hover:text-indigo-600 transition"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
