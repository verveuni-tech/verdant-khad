import { memo } from "react";
import { Truck, ShieldCheck, Leaf, Package, RefreshCcw } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Delivered within 3–5 days",
  },
  {
    icon: Leaf,
    title: "100% Organic",
    subtitle: "Chemical-free compost",
  },
  {
    icon: ShieldCheck,
    title: "Lab Tested Quality",
    subtitle: "Verified nutrient standards",
  },
  {
    icon: Package,
    title: "Bulk Orders Available",
    subtitle: "Farm-scale supply support",
  },
  {
    icon: RefreshCcw,
    title: "Easy Support",
    subtitle: "Quick assistance & resolution",
  },
];

const TrustStrip = memo(function TrustStrip() {
  return (
    <section className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-10
          text-center
        ">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center">

                <div className="
                  w-14 h-14
                  rounded-full
                  bg-green-100
                  flex items-center justify-center
                  mb-4
                ">
                  <Icon size={22} className="text-green-600" />
                </div>

                <h4 className="text-sm font-semibold text-brand-brown">
                  {item.title}
                </h4>

                <p className="text-xs text-brand-gray mt-2">
                  {item.subtitle}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

export default TrustStrip;