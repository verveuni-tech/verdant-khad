import { memo } from "react";
import { motion } from "framer-motion";

const solutions = [
  { title: "Plant Compost", subtitle: "Kitchen & Garden Waste" },
  { title: "Animal Manure", subtitle: "Traditional Organic Inputs" },
  { title: "Special Inputs", subtitle: "Neem, Bone Meal & More" },
  { title: "Liquid Fertilizers", subtitle: "Jeevamrit & Boosters" },
  { title: "Natural Methods", subtitle: "NADEP & Traditional Systems" },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const OrganicSolutions = memo(function OrganicSolutions() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-brown">
            Explore Organic Solutions
          </h2>
        </div>

        <motion.div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-6
          "
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((itemData, index) => (
            <motion.div
              key={index}
              variants={item}
              className="
                group
                bg-white
                border border-gray-200
                rounded-3xl
                p-6
                text-center
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              <div className="
                h-28 mb-5 rounded-2xl
                bg-gradient-to-br
                from-green-100 via-green-50 to-green-100
              " />

              <h3 className="text-base font-semibold text-brand-brown">
                {itemData.title}
              </h3>

              <p className="text-xs text-brand-gray mt-2">
                {itemData.subtitle}
              </p>

              <div className="mt-4 text-sm text-green-600 font-medium">
                Explore →
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
});

export default OrganicSolutions;