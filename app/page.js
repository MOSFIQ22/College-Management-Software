"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import FacultyCard from "@/components/FacultyCard";
import { motion } from "framer-motion";
import login  from "@/pages/login";
import register  from "@/pages/register";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    setCourses([
      "B.A. in English",
      "B.Sc. in Computer Science",
      "BBA",
      "B.Sc. in Physics",
    ]);
    setFaculty([
      { name: "Dr. Jane Doe", subject: "Professor of Mathematics" },
      { name: "Dr. John Smith", subject: "Professor of Physics" },
      { name: "Dr. Emily Davis", subject: "Professor of English" },
      { name: "Dr. Michael Brown", subject: "Professor of Business Administration" },
    ]);
  }, []);

  return (
    <>
      <Hero />
  
 <section
  id="about"
  className="mt-24 px-6 md:px-16 py-16"
 >
  <motion.h3
    className="text-3xl md:text-4xl font-extrabold text-center text-white tracking-wide"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    About ABC College
  </motion.h3>

  <motion.p
    className="mt-6 max-w-3xl mx-auto text-center text-white font-semibold text-lg md:text-xl leading-relaxed tracking-wide"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <span className="font-extrabold text-white">ABC College</span> is dedicated to providing high-quality education, fostering 
    <span className="font-extrabold text-white"> innovation</span>, and empowering students to reach their full potential.
  </motion.p>

  <motion.p
    className="mt-4 max-w-3xl mx-auto text-center text-white font-semibold text-lg md:text-xl leading-relaxed tracking-wide"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    Our mission is to create a nurturing and innovative environment where students can excel academically and personally.
  </motion.p>
 </section>



 {/* Courses Section */}
 <section
  id="courses"
  className="mt-20 px-6 md:px-16 py-20 relative"
  style={{
    backgroundImage: "url('/students.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
 >
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black/85"></div>

  {/* Section Content */}
  <div className="relative z-10">
    <motion.h3
      className="text-3xl md:text-4xl font-extrabold text-center text-white tracking-wide"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Popular Courses
    </motion.h3>

    {/* Courses List */}
    <div className="mt-12 flex flex-col md:flex-row md:justify-center md:space-x-12 space-y-6 md:space-y-0">
      {courses.map((course, i) => (
        <motion.div
          key={course}
          className="text-center text-white font-semibold text-lg md:text-xl cursor-pointer transition-all duration-300 hover:text-purple-400 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {course}
           {/* <CourseCard title={course} /> */}
        </motion.div>
      ))}
    </div>
  </div>
 </section>
  


     {/* Faculty Section */}
 <section id="faculty" className="mt-20 px-6 md:px-16">

 {/* Light Green */}
 <h3 className="text-4xl font-extrabold text-center text-green-300">
  Meet Our Faculty
 </h3>
  <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
    {faculty.map((prof, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ scale: 1.08 }}
        className="bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-black"
      >
        <FacultyCard name={prof.name} subject={prof.subject} />
      </motion.div>
    ))}
  </div>
 </section>

      {/* CTA Section */}
      <section className="mt-24 py-16 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white text-center rounded-3xl mx-6 md:mx-16 shadow-2xl">
        <h3 className="text-4xl font-extrabold drop-shadow-lg">
          Join <span className="text-yellow-300">ABC College</span> Today
        </h3>
        <p className="mt-4 max-w-xl mx-auto text-lg text-gray-100">
          Unlock your potential with world-class education and supportive faculty.
        </p>
        <button className="mt-8 px-8 py-3 bg-yellow-300 text-purple-900 font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition">
          Apply Now
        </button>
      </section>
    </>
  );
}
