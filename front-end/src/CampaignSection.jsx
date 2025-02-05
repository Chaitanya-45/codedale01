import hero2 from "./assets/hero2.png-removebg-preview.png";
import { Link } from "react-router-dom";

export default function CampaignSection() {
  return (
    <section className="bg-[#FFF8F8] py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex justify-center">
          <img src={hero2} alt="Campaign" className="rounded-lg" />
        </div>
        <div className="md:w-1/2 text-left mt-6 md:mt-0 md:pl-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Meet Campaign Goals
          </h2>
          <div className="text-lg text-gray-600 mt-4 space-y-4">
            <div className="flex items-center">
              <span className="text-black text-xl mr-3">✔</span>
              <p>Streamline Data Collection with Ease</p>
            </div>
            <div className="flex items-center">
              <span className="text-black text-xl mr-3">✔</span>
              <p>Adapt Forms Dynamically for Smarter Insights</p>
            </div>
            <div className="flex items-center">
              <span className="text-black text-xl mr-3">✔</span>
              <p>Track Responses in Real-Time & Make Data-Driven Decisions</p>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
          <Link
              to="/signup"
              className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600 ml-4"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
