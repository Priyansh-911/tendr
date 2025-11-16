import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Photography",
    description: "Capture timeless memories with our curated photographers.",
    image:
      "https://images.unsplash.com/photo-1747319820357-3f37244a3b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Entertainment",
    description:
      "Keep the celebration alive with top-tier artists and entertainers.",
    image:
      "https://images.unsplash.com/photo-1729553199933-c897fea4f41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Decor",
    description:
      "Transform your venue with stunning decor themes and elegance.",
    image:
      "https://images.unsplash.com/photo-1532276865658-80462d4b71cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Catering",
    description: "Delight your guests with premium cuisines and curated menus.",
    image:
      "https://images.unsplash.com/photo-1751651054934-3fbdf1d54d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const JourneyFlow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % steps.length);

  return (
    <div className="md:min-h-[85vh] bg-white flex flex-col items-center text-center overflow-hidden py-10">
      <h2 className="text-4xl md:text-6xl font-semibold text-[#4a2e1f] mt-6 mb-20">
        Top Rated Vendors
      </h2>

      <div className="flex items-center gap-4 relative w-[95%] justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="text-3xl bg-transparent border-none cursor-pointer text-[#4a2e1f] z-20"
        >
          ◀
        </button>

        {/* Cards Container */}
        <div className="relative flex justify-center w-full h-[380px] md:h-[500px] perspective-1000 overflow-visible">
          {steps.map((step, idx) => {
            const offset = (idx - activeIndex + steps.length) % steps.length;

            // Desktop defaults
            let scale = 0.7;
            let opacity = 0;
            let zIndex = 0;
            let xPos = (offset - 2) * 250;

            // Mobile: ONLY active card shows
            if (window.innerWidth < 768) {
              if (offset === 0) {
                scale = 1;
                opacity = 1;
                zIndex = 10;
                xPos = 0;
              } else {
                opacity = 0;
                scale = 0.6;
              }
            } else {
              // Desktop carousel depth layout
              if (offset === 0) {
                scale = 1.2;
                opacity = 1;
                zIndex = 10;
                xPos = 0;
              } else if (offset === 1 || offset === steps.length - 1) {
                scale = 0.9;
                opacity = 0.7;
                zIndex = 5;
                xPos = offset === 1 ? 480 : -480;
              }
            }

            return (
              <motion.div
                key={idx}
                animate={{ opacity, scale, x: xPos }}
                transition={{ duration: 0.5 }}
                className="absolute w-[260px] h-[360px] md:w-[500px] md:h-[500px] rounded-2xl shadow-xl overflow-hidden border-0 bg-[#d3b89c]"
                style={{
                  zIndex,
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${step.image})`,
                    filter:
                      offset === 0 ? "none" : "grayscale(30%) blur(1.5px)",
                    opacity: offset === 0 ? 0.95 : 0.65,
                  }}
                >
                  <div className="px-4 md:px-32">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-white">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="text-3xl bg-transparent border-none cursor-pointer text-[#4a2e1f] z-20"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default JourneyFlow;
