import hero from "./assets/hero.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-white py-17 px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-left">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Streamline Data Collection, <br></br>Power Insights with Projekt
          </h1>
          <h2 className="text-lg text-gray-600 mt-4">
          Smart Forms, Smarter Decisions, Seamless Integration.
          </h2>
          <div className="mt-6 flex space-x-4">
          <Link
              to="/signup"
              className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600 ml-4"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-1">
          <img src={hero} alt="Workflow" className="rounded-lg w-[100%]" />
        </div>
      </div>
    </section>
  );
}
