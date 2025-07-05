import Image from "next/image";

export default function StudyAbroadPage() {
  return (
    <main className="bg-white text-[#2c1e52]">
      {/* Hero Section */}
      <section className="bg-[#f5f3ff] px-6 py-20 text-center md:px-20">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Explore Your Study Abroad Journey
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[#5b4b8a]">
          Get access to expert guidance, university options, scholarships, and
          visa assistance to make your international education dream come true.
        </p>
      </section>

      {/* Ad 1 */}
      <section className="px-6 py-10 md:px-20">
        <div className="w-full rounded-xl bg-[#ede9fe] p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-purple-800">
            🎓 Get 100% FREE IELTS Mock Test Now!
          </p>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="bg-white px-6 py-16 md:px-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            { title: "Australia", img: "/ads/australia.jpg" },
            { title: "Canada", img: "/ads/canada.jpg" },
            { title: "Japan", img: "/ads/japan.jpg" },
            { title: "UK", img: "/ads/uk.jpg" },
            { title: "USA", img: "/ads/usa.jpg" },
            { title: "South Korea", img: "/ads/korea.jpg" },
          ].map((country, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-[#f9f9ff] shadow transition hover:shadow-md"
            >
              <Image
                src={country.img}
                alt={country.title}
                width={400}
                height={250}
                className="h-52 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{country.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad 2 */}
      <section className="px-6 py-10 md:px-20">
        <div className="w-full rounded-xl bg-gradient-to-r from-purple-300 to-purple-100 p-6 text-center">
          <p className="text-lg font-semibold text-purple-900">
            🛫 Planning to Study in Japan? Book Your JRE Mock Test Today!
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#f5f3ff] px-6 py-16 md:px-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              title: "Counseling",
              desc: "Get personalized study plans & expert advice.",
            },
            {
              title: "University Application",
              desc: "We help you apply to top universities abroad.",
            },
            {
              title: "Visa Assistance",
              desc: "From documentation to interviews, we got you.",
            },
            {
              title: "Mock Tests",
              desc: "Practice IELTS, JRE, NAT with real test simulations.",
            },
            {
              title: "Scholarships",
              desc: "Explore scholarship opportunities and funding options.",
            },
            {
              title: "Accommodation Support",
              desc: "Secure safe and student-friendly housing abroad.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
              <p className="text-[#5b4b8a]">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad 3 */}
      <section className="px-6 py-10 md:px-20">
        <div className="w-full rounded-xl bg-[#ede9fe] p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-purple-800">
            💬 Join our FREE Webinar: How to Crack Visa Interviews — Every
            Saturday at 4PM!
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-20 text-center md:px-20">
        <h2 className="mb-6 text-3xl font-bold">Start Your Journey Today</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#5b4b8a]">
          Whether you're aiming for the UK, Australia, Canada, or Japan — our
          experts are here to guide you every step of the way.
        </p>
        <button className="rounded-lg bg-[#6b46c1] px-8 py-4 text-lg font-medium text-white transition hover:bg-[#5a38a7]">
          Book Free Counseling
        </button>
      </section>
    </main>
  );
}
