export default function FacultyCard({ name, subject }) {
  return (
    <div className="p-4 border rounded text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-3 flex items-center justify-center">Prof</div>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-600">{subject}</div>
    </div>
  );
}
