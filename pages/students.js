"use client";
import { useState, useEffect } from "react";
import "../app/globals.css";

export default function StudentPage() {
  const [student, setStudent] = useState({
    student_id: "",
    roll_no: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    admission_year: "",
    department: "",
    guardians: [],
  });
  const [studentsList, setStudentsList] = useState([]);
  useEffect(() => {
    fetch("/api/student")
      .then((res) => res.json())
      .then((data) => setStudentsList(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleGuardianChange = (index, e) => {
    const { name, value } = e.target;
    const newGuardians = [...student.guardians];
    newGuardians[index][name] = value;
    setStudent({ ...student, guardians: newGuardians });
  };

  const addGuardian = () => {
    setStudent({
      ...student,
      guardians: [
        ...student.guardians,
        { guardian_name: "", relation: "", phone: "", email: "", address: "", occupation: "" },
      ],
    });
  };

  const removeGuardian = (index) => {
    const newGuardians = student.guardians.filter((_, i) => i !== index);
    setStudent({ ...student, guardians: newGuardians });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Student added successfully!");
        setStudentsList([{ ...student, student_id: data.id }, ...studentsList]);
        resetForm();
      } else alert(data.error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (s) => setStudent({ ...s });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/student", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      const data = await res.json();
      if (data.success) {
        setStudentsList(
          studentsList.map((s) =>
            s.student_id === student.student_id ? student : s
          )
        );
        alert("✅ Student updated successfully!");
        resetForm();
      } else alert(data.error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (student_id) => {
    if (!confirm("Delete this student?")) return;
    try {
      const res = await fetch("/api/student", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id }),
      });
      const data = await res.json();
      if (data.success) {
        setStudentsList(studentsList.filter((s) => s.student_id !== student_id));
        alert("✅ Deleted successfully!");
      } else alert(data.error);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () =>
    setStudent({
      student_id: "",
      roll_no: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      admission_year: "",
      department: "",
      guardians: [],
    });

  return (
  <div className="min-h-screen bg-gray-100 p-10 text-gray-800">
   <h1 className="text-4xl font-bold text-center mb-10">Student and Guardian Information</h1>

   {/* Student Form */}
   <section className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
      {student.student_id ? "Edit Student" : "Add New Student"}
    </h2>

    <form className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          name="roll_no"
          placeholder="Roll No*"
          value={student.roll_no}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
        />
        <input
          name="first_name"
          placeholder="First Name*"
          value={student.first_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={student.last_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={student.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
        <input
          name="admission_year"
          placeholder="Admission Year (e.g. 2025)"
          value={student.admission_year}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
        <input
          name="department"
          placeholder="Department*"
          value={student.department}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
        />
      </div>

      {/* Guardians Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">Guardians</h3>
          <button
            type="button"
            onClick={addGuardian}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            + Add Guardian
          </button>
        </div>
        {student.guardians.length === 0 ? (
          <p className="text-gray-500 italic">No guardians added yet.</p>
        ) : (
          student.guardians.map((g, idx) => (
            <div
              key={idx}
              className="border border-gray-300 p-4 mb-4 rounded-md bg-gray-50 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  name="guardian_name"
                  placeholder="Guardian Name*"
                  value={g.guardian_name}
                  onChange={(e) => handleGuardianChange(idx, e)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                  required
                />
                <input
                  name="relation"
                  placeholder="Relation*"
                  value={g.relation}
                  onChange={(e) => handleGuardianChange(idx, e)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={g.phone}
                  onChange={(e) => handleGuardianChange(idx, e)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={g.email}
                  onChange={(e) => handleGuardianChange(idx, e)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                />
                <input
                  name="occupation"
                  placeholder="Occupation"
                  value={g.occupation}
                  onChange={(e) => handleGuardianChange(idx, e)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                />
                <input
                  name="address"
                  placeholder="Address"
                  value={g.address}
                  onChange={(e) => handleGuardianChange(idx, e)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                />
              </div>
              <button
                type="button"
                onClick={() => removeGuardian(idx)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          onClick={student.student_id ? handleUpdate : handleSubmit}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          {student.student_id ? "Update Student" : "Add Student"}
        </button>
        {student.student_id && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  </section>

  {/* Student List */}
  <section className="max-w-6xl mx-auto bg-white rounded-lg shadow mt-12 p-8">
    <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-2">
      Student List
    </h2>

    {studentsList.length === 0 ? (
      <p className="text-gray-500 text-center italic">No students found.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-gray-800">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-5 py-3 border-b">Roll No</th>
              <th className="px-5 py-3 border-b">Name</th>
              <th className="px-5 py-3 border-b">Department</th>
              <th className="px-5 py-3 border-b">Admission</th>
              <th className="px-5 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((s, idx) => (
              <tr
                key={s.student_id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition`}
              >
                <td className="px-5 py-3 border-b">{s.roll_no}</td>
                <td className="px-5 py-3 border-b">
                  {s.first_name} {s.last_name}
                </td>
                <td className="px-5 py-3 border-b">{s.department}</td>
                <td className="px-5 py-3 border-b">
                  {s.admission_year || "-"}
                </td>
                <td className="px-5 py-3 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.student_id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
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
