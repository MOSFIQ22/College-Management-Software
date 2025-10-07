"use client";
import { useState, useEffect } from "react";
import "../app/globals.css";

export default function TeacherPage() {
  const [teacher, setTeacher] = useState({
    emp_code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [teachersList, setTeachersList] = useState([]);

  // Fetch teachers on mount
  useEffect(() => {
    fetch("/api/teacher")
      .then(res => res.json())
      .then(data => setTeachersList(data))
      .catch(err => console.error(err));
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  // Add new teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });
      const data = await res.json();
      if (data.success) {
        alert("Teacher added successfully!");
        setTeachersList([{ ...teacher, id: data.id }, ...teachersList]);
        setTeacher({ emp_code: "", first_name: "", last_name: "", email: "", phone: "", department: "" });
      } else {
        alert(data.error || "Failed to add teacher");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Edit teacher (populate form)
  const handleEdit = (t) => {
    setTeacher({
      emp_code: t.emp_code,
      first_name: t.first_name,
      last_name: t.last_name,
      email: t.email,
      phone: t.phone,
      department: t.department,
      teacher_id: t.id,
    });
  };

  // Update teacher
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!teacher.teacher_id) return alert("No teacher selected for update");

    try {
      const res = await fetch("/api/teacher", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });
      const data = await res.json();
      if (data.success) {
        setTeachersList(teachersList.map(t => t.id === teacher.teacher_id ? teacher : t));
        alert("Teacher updated successfully!");
        setTeacher({ emp_code: "", first_name: "", last_name: "", email: "", phone: "", department: "" });
      } else {
        alert(data.error || "Failed to update teacher");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Delete teacher
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const res = await fetch("/api/teacher", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacher_id: id }),
      });
      const data = await res.json();
      if (data.success) {
        setTeachersList(teachersList.filter(t => t.id !== id));
        alert("Teacher deleted successfully!");
      } else {
        alert(data.error || "Failed to delete teacher");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Teacher Management</h1>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-10 mb-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">{teacher.teacher_id ? "Edit Teacher" : "Add New Teacher"}</h2>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Employee Code*</label>
              <input
                type="text"
                name="emp_code"
                value={teacher.emp_code}
                onChange={handleChange}
                required
                placeholder="E.g. T-001"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">First Name*</label>
              <input
                type="text"
                name="first_name"
                value={teacher.first_name}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={teacher.last_name}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={teacher.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={teacher.phone}
                onChange={handleChange}
                placeholder="+880 1XXXXXXXXX"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">Department*</label>
              <input
                type="text"
                name="department"
                value={teacher.department}
                onChange={handleChange}
                required
                placeholder="CSE"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm text-gray-900"
              />
            </div>
          </div>

          <button
  type="submit"
  onClick={teacher.teacher_id ? handleUpdate : handleSubmit}
  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-indigo-700 transition"
>
  {teacher.teacher_id ? "Update Teacher" : "Add Teacher"}
</button>
        </form>
      </section>

      {/* Teacher List Section */}
      <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-2">Teacher List</h2>

        {teachersList.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-4">No teachers added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-indigo-100 text-gray-700">
                <tr>
                  <th className="px-5 py-3 font-medium">Emp Code</th>
                  <th className="px-5 py-3 font-medium">First Name</th>
                  <th className="px-5 py-3 font-medium">Last Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachersList.map((t, idx) => (
                  <tr
                    key={t.id}
                    className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition text-gray-800`}
                  >
                    <td className="px-5 py-3">{t.emp_code}</td>
                    <td className="px-5 py-3">{t.first_name}</td>
                    <td className="px-5 py-3">{t.last_name || '-'}</td>
                    <td className="px-5 py-3">{t.email || '-'}</td>
                    <td className="px-5 py-3">{t.phone || '-'}</td>
                    <td className="px-5 py-3">{t.department}</td>
                    <td className="px-5 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
