export default function CourseCard({ title }) {
  return (
    <div className="p-6 border rounded hover:shadow">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">Program duration: 4 years • Seats available: 60</p>
      <div className="mt-4">
        <a className="text-indigo-600 hover:underline" href="#">Details</a>
      </div>
    </div>
  );
}
