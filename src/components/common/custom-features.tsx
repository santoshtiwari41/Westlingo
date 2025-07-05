import CustomSection from "./custom-section";

const CustomFeatures = () => {
  return (
    <CustomSection className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {[
        { title: "Academic", subtitle: "IELTS Course" },
        { title: "General Training", subtitle: "IELTS Course" },
        { title: "Academic", subtitle: "IELTS Course" },
        { title: "General Training", subtitle: "IELTS Course" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex aspect-square flex-col items-center justify-center rounded-lg bg-gray-200 p-8"
        >
          <h3 className="font-semibold text-gray-800">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
        </div>
      ))}
    </CustomSection>
  );
};

export default CustomFeatures;
