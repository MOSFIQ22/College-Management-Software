import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-sky-600 to-indigo-700 text-white mt-24 relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500 opacity-20 rounded-full -z-10"></div>
      <div className="absolute -bottom-24 right-0 w-80 h-80 bg-sky-500 opacity-20 rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* College Info */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">ABC College</h2>
          <p className="mt-3 text-gray-200 text-sm md:text-base leading-relaxed">
            Excellence in Education for over 50 years. We prepare students for leadership, service, and lifelong learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 tracking-wide">Quick Links</h3>
          <ul className="space-y-2 text-sm md:text-base">
            {["About Us", "Courses", "Faculty", "Admissions", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/ /g, "")}`}
                  className="hover:underline hover:text-indigo-200 transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 tracking-wide">Follow Us</h3>
          <div className="flex gap-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition"
              >
                <Icon className="text-white hover:text-indigo-900" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-8 py-4 text-center text-sm text-gray-200 flex flex-col md:flex-row md:justify-between gap-2">
        <div>© {new Date().getFullYear()} ABC College. All rights reserved.</div>
        <div>Designed with ❤️ using Next.js & Tailwind</div>
      </div>
    </footer>
  );
}
