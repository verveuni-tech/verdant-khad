import { memo, useState, useEffect, useMemo, useRef } from "react";

const AUTOPLAY_DELAY = 4000;

const Hero = memo(function Hero() {
  const slides = useMemo(
    () => [
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1600/v1772034986/hero1_y18mkq.jpg",
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1600/v1772034991/hero2_hee5fu.jpg",
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1600/v1772034989/hero3_vyeezi.jpg",
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  return (
    <section className="relative bg-gradient-to-b from-white to-brand-green/5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* BADGES */}
        <div className="flex justify-center gap-3 flex-wrap text-xs sm:text-sm mb-6">
          <span className="bg-green-100 text-brand-green px-4 py-1.5 rounded-full font-medium">
            100% Organic
          </span>
          <span className="bg-gray-100 px-4 py-1.5 rounded-full font-medium">
            Chemical-Free
          </span>
          <span className="bg-gray-100 px-4 py-1.5 rounded-full font-medium">
            Sustainable Farming
          </span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-brown leading-tight mb-6">
          Nourish Your Soil.
          <br className="hidden sm:block" />
          Grow Naturally.
        </h1>

        {/* SUBTEXT */}
        <p className="text-brand-gray max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-14">
          Premium organic compost crafted to restore soil health,
          boost yield, and support sustainable farming practices.
        </p>

        {/* AUTO CAROUSEL */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Organic compost farming"
                loading="lazy"
                className="w-full h-72 sm:h-96 md:h-[500px] object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
});

export default Hero;