"use client";

import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hooks always at top-level
  const { scrollY } = useViewportScroll();
  const campusY = useTransform(scrollY, [0, 500], [0, -25]);
  const studentsY = useTransform(scrollY, [0, 500], [0, -15]);
  const circleTopY = useTransform(scrollY, [0, 500], [0, 10]);
  const circleBottomY = useTransform(scrollY, [0, 500], [0, -10]);

  return (
    <section className="relative grid md:grid-cols-2 gap-8 items-center mt-16 p-6 md:p-10 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-50 via-sky-50 to-white">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Decorative Circles */}
      <motion.div
        style={{ y: isClient ? circleTopY : 0 }}
        className="absolute -top-20 -left-10 w-48 md:w-72 h-48 md:h-72 bg-indigo-200 rounded-full opacity-50 -z-10"
      />
      <motion.div
        style={{ y: isClient ? circleBottomY : 0 }}
        className="absolute -bottom-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-sky-200 rounded-full opacity-40 -z-10"
      />

      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Welcome to <span className="text-indigo-600">ABC College</span>
        </h2>
        <p className="mt-4 md:mt-6 text-gray-700 text-sm md:text-lg">
          A vibrant community of learners, thinkers, and doers. Undergraduate
          and graduate programs designed for leadership and service.
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center md:justify-start gap-3">
          <a
            href="#admission"
            className="bg-indigo-600 text-white px-5 py-2 md:px-6 md:py-3 rounded-full shadow hover:bg-indigo-700 transition"
          >
            🎓 Apply Now
          </a>
          <a
            href="#courses"
            className="border border-indigo-600 text-indigo-600 px-5 py-2 md:px-6 md:py-3 rounded-full hover:bg-indigo-50 transition"
          >
            📚 View Courses
          </a>
        </div>
      </motion.div>

      {/* Right Image Collage */}
      <motion.div
        className="relative w-full h-64 md:h-96 mt-6 md:mt-0"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/college-campus.jpg"
          alt="Campus"
          style={{ y: isClient ? campusY : 0 }}
          className="absolute top-0 left-0 md:left-10 w-48 md:w-72 h-48 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-white"
          whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.img
          src="/students.jpg"
          alt="Students"
          style={{ y: isClient ? studentsY : 0 }}
          className="absolute bottom-0 right-0 w-36 md:w-64 h-36 md:h-64 object-cover rounded-2xl shadow-lg border-4 border-white"
          whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        />
      </motion.div>
    </section>
  );
}
