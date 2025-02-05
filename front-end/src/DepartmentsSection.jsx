function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DepartmentsSection() {
  return (
    <section className="bg-[#FFF8F8] py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Different departments use Projekt for various operations
        </h2>
        <div className="mt-8 flex justify-center space-x-7">
        {["Business", "Healthcare", "Education", "Marketing", "HR & Recruitment"].map(
  (department, index) => (
    <div
      key={index}
      className="px-6 py-3 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white cursor-pointer transition-all duration-300 text-lg"
    >
      {department}
    </div>
  )
)}
        </div>
      </div>
    </section>
    );
  }
