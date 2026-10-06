import { useOutletContext } from "react-router-dom";

export default function CategoryCard({ name, icon }) {
  const { setCategory } = useOutletContext();

  return (
    <button
      onClick={() => setCategory(name)}
      className="w-full bg-white border border-pink-100 rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition duration-300"
    >
      <div className="w-14 h-14 mx-auto bg-pink-50 rounded-full flex items-center justify-center text-2xl">
        {icon}
      </div>

      <h3 className="font-semibold text-gray-800 mt-3">
        {name}
      </h3>
    </button>
  );
}