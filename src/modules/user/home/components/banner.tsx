import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-8 bg-white px-6 pb-10 md:flex-row md:px-12">
      <div className="flex w-full justify-center md:w-[40%]">
        <div className="relative h-64 w-64 md:h-80 md:w-80">
          <Image
            src="/courses.svg"
            alt="Banner"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4 text-center md:w-[60%] md:items-start md:text-left">
        <h1 className="mb-2 text-3xl font-extrabold text-zinc-900 md:text-4xl dark:text-white">
          Welcome to WLC{" "}
          <span className="text-purple-700 dark:text-purple-300">
            Consultancy
          </span>
        </h1>
        <p className="mb-4 max-w-2xl text-lg text-zinc-700 md:text-xl dark:text-zinc-200">
          At WLC Consultancy, we specialize in helping you prepare for
          international exams like{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-300">
            IELTS
          </span>
          ,{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-300">
            JRE
          </span>
          , and many more. Our services include expert-led{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-300">
            preparation classes
          </span>
          , realistic{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-300">
            mock tests
          </span>
          , and easy{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-300">
            test booking
          </span>
          . We also provide complete guidance for{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-300">
            study abroad
          </span>{" "}
          and visa processing to make your global education journey smoother and
          stress-free.
        </p>
      </div>
    </div>
  );
};

export default Banner;
