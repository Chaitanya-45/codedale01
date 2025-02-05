import { useState, useEffect } from "react";

export default function SlidesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      heading: "What is Projekt?",
      content:
        "Projekt is a dynamic online forms platform designed to streamline data collection and turn raw responses into actionable insights. Whether you're gathering feedback, conducting surveys, or collecting critical data, Projekt offers an intuitive way to build custom forms with diverse question types, conditional logic, and secure storage.",
    },
    {
      heading: "How does Projekt Work?",
      content:
        "Projekt operates through an easy-to-use form builder that lets you create and distribute forms in just minutes. As responses roll in, you can monitor them in real time with powerful analytics, ensuring that you capture every detail. Additionally, seamless API integrations allow your collected data to flow directly into your favorite external tools, automating your workflow from start to finish.",
    },
    {
      heading: "Why Choose an Online Forms Platform?",
      content:
        "In today’s data-driven world, efficiency and accuracy in data collection are paramount. Projekt minimizes manual tasks and errors by automating the entire process—from creation to analysis—while offering robust security with role-based access controls. This ensures that your organization remains agile, compliant, and ready to respond to evolving business needs.",
    },
    {
      heading: "Unlocking the Power of Your Data",
      content:
        "Projekt transforms your data into a strategic asset. With its real-time analytics, automated reporting, and effortless integration with other platforms, you can easily identify trends, measure performance, and drive informed decisions. Embrace the full potential of your data to optimize processes, boost collaboration, and ultimately propel your organization toward success.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#FFF8F8] py-10 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mt-0">
          <div className="w-full h-70 p-6 rounded-md">
            <h3 className="text-2xl font-bold bg-[#f4f4fa] inline-block">
              {slides[currentSlide].heading}
            </h3>
            <p className="text-lg text-gray-600 mt-4">
              {slides[currentSlide].content}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 ">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full bg-black cursor-pointer ${
              currentSlide === index ? "bg-red-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}
