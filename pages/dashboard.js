"use client";
import { useState } from "react";
import {Bell,LogOut,User,BookOpen,Home,Calendar,CreditCard,MessageCircle,Activity,Users,Award,ChevronLeft,ChevronRight,BarChart,PieChart,
} from "lucide-react";
import "../app/globals.css";

export default function StudentTeacherDashboard() {
  const [open, setOpen] = useState(true); // Sidebar open state

  const handleLogout = async () => {
    console.log("Logging out and redirecting to /login...");
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API failed, redirecting anyway:", error);
    }
    window.location.href = "/login";
  };

  // Dummy data
  const summaryData = [
    { title: "Students", value: "124,684", icon: User, change: "+15%", color: "bg-indigo-200 text-indigo-700", trendColor: "text-green-500" },
    { title: "Teachers", value: "12,379", icon: BookOpen, change: "+3%", color: "bg-yellow-200 text-yellow-700", trendColor: "text-green-500" },
    { title: "Staff", value: "29,300", icon: Users, change: "-3%", color: "bg-purple-200 text-purple-700", trendColor: "text-red-500" },
    { title: "Awards", value: "95,800", icon: Award, change: "+5%", color: "bg-yellow-100 text-yellow-600", trendColor: "text-green-500" },
  ];

  const QuickInfoCard = ({ title, value, icon: Icon, change, color, trendColor }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
      <div>
        <div className={`p-3 rounded-lg ${color} mb-3 inline-block`}>
          <Icon size={24} />
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <div className={`flex items-center text-sm font-medium ${trendColor}`}>
        <span className="mr-1">{change}</span>
        {change.startsWith("+") ? "↑" : "↓"}
      </div>
    </div>
  );

  const AgendaItem = ({ time, title, subtitle, bgClass }) => (
    <div className={`p-3 rounded-md mb-2 ${bgClass}`}>
      <p className="text-xs text-gray-500">{time}</p>
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-indigo-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-indigo-700 text-white flex flex-col justify-between transition-all duration-300 ${open ? "w-64" : "w-16"}`}>
        <div>
          {/* Header & Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-indigo-600">
            <div className="text-2xl font-bold">{open ? "🦉 SchoolHub" : "🦉"}</div>
            <button
              onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-200 transition-colors shadow-md"
                  title={open ? "Collapse Sidebar" : "Expand Sidebar"}
              >
              {open ? <ChevronLeft size={18} className="text-indigo-700" /> : <ChevronRight size={18} className="text-indigo-700" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 space-y-2 px-2">
            <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-indigo-600 font-semibold">
              <Home size={18} /> {open && "Dashboard"}
            </a>
            <a href="/teachers" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600">
              <BookOpen size={18} /> {open && "Teachers"}
            </a>
            <a href="/students" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600">
              <User size={18} /> {open && "Students"}
            </a>
            <a href="/attendance" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600">
              <Activity size={18} /> {open && "Attendance"}
            </a>          
            <a href="/notice" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600">
              <Bell size={18} /> {open && "Notice"}
            </a>            
            <a href="/message" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600">
              <MessageCircle size={18} /> {open && "Message"}
            </a>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-center text-sm p-4 border-t border-indigo-600">
          <a href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 mt-2 justify-center">
            <User size={18} /> {open && "Profile"}
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${open ? "ml-64" : "ml-16"}`}>
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-l pl-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium text-gray-700">Linda Adora</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="p-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((data) => (
              <QuickInfoCard key={data.title} {...data} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Students</h2>
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg text-gray-400">
                <PieChart size={48} />
                <p className="mt-2">Gender Breakdown Chart Placeholder</p>
                <div className="flex justify-between w-full px-4 mt-4">
                  <p className="text-indigo-600 text-sm">Boys (47%) - 45,414</p>
                  <p className="text-pink-500 text-sm">Girls (53%) - 40,270</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-semibold text-gray-700">Attendance</h2>
                <div className="flex gap-3">
                  <select className="border rounded-md text-sm p-1">
                    <option>Weekly</option>
                  </select>
                  <select className="border rounded-md text-sm p-1">
                    <option>Grade 3</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg text-gray-400">
                <BarChart size={48} />
                <p className="mt-2">Attendance Bar Chart Placeholder (95% Present)</p>
              </div>
            </div>
          </div>

          {/* Agenda & Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Agenda</h2>
              <div className="space-y-3">
                <AgendaItem time="08:00 AM" title="All Grade" subtitle="Homeroom & Announcement" bgClass="bg-indigo-50" />
                <AgendaItem time="10:00 AM" title="Grade 3-5" subtitle="Math Review & Practice" bgClass="bg-yellow-50" />
                <AgendaItem time="10:30 AM" title="Grade 6-8" subtitle="Science Experiment & Discussion" bgClass="bg-pink-50" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-semibold text-gray-700">Messages</h2>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">View All</a>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <img src="https://i.pravatar.cc/40?img=2" alt="Dr. Lila Ramirez" className="w-10 h-10 rounded-full"/>
                  <div>
                    <p className="font-medium text-gray-800">Dr. Lila Ramirez</p>
                    <p className="text-xs text-gray-500">9:00 AM</p>
                    <p className="text-sm text-gray-600 truncate">Re: Your request for leave...</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img src="https://i.pravatar.cc/40?img=3" alt="Mr. John Doe" className="w-10 h-10 rounded-full"/>
                  <div>
                    <p className="font-medium text-gray-800">Mr. John Doe</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                    <p className="text-sm text-gray-600 truncate">Need help with the report...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
