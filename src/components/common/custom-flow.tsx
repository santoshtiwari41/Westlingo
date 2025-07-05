import Image from "next/image";

import CustomSection from "./custom-section";

const CustomFlow = ({ course }: { course: string }) => {
  const features = [
    {
      title: `Choose your ${course.toUpperCase()}`,
      description:
        "Select from Academic or General Training based on your goals",
      icon: "/icons/choose4.png",
    },
    {
      title: "Choose your coaching",
      description: "Pick from individual or group coaching sessions",
      icon: "/icons/choose3.png",
    },
    {
      title: "Practice with our expert",
      description: `Get guidance from certified ${course.toUpperCase()} instructors`,
      icon: "/icons/choose2.png",
    },
    {
      title: "Book your Test",
      description: `Schedule your official ${course.toUpperCase()} examination`,
      icon: "/icons/choose1.png",
    },
  ];

  return (
    <CustomSection className="bg-[#F24822]">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Preparation easy now with westlingo
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center text-white">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-white/20 p-4">
                <Image
                  src={feature.icon}
                  width={100}
                  height={100}
                  alt={feature.icon}
                />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </CustomSection>
  );
};

export default CustomFlow;
