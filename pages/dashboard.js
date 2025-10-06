import { verifyToken } from "../lib/auth";
import cookie from "cookie";
import "../app/globals.css";

export default function Dashboard({ user }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Dashboard</h2>
        <p className="text-gray-700 mb-6 text-lg">
          Welcome, <span className="font-medium">{user.email}</span>!
        </p>

        <button
          onClick={async () => {
            await fetch("/api/logout");
            window.location.href = "/login";
          }}
          className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300 shadow-md"
        >
          Logout
        </button>

        <div className="mt-6 text-gray-500 text-sm">
          <p>Thank you for using our platform!</p>
        </div>
      </div>
    </div>

  );
}

// Server-side protection
export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token || null;

  const user = verifyToken(token);
  if (!user) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: { user } };
}


