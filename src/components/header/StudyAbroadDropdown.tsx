import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  { name: "USA", slug: "usa" },
  { name: "UK", slug: "uk" },
  { name: "Canada", slug: "canada" },
  { name: "Australia", slug: "australia" },
  { name: "New Zealand", slug: "new-zealand" },
  { name: "Germany", slug: "germany" },
];

export default function StudyAbroadDropdown() {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 focus:ring-indigo-300">
        Study Abroad <ChevronDown className="ml-1 h-3 w-3" />
      </button>
      <div className="animate-fade-in invisible absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="py-2">
          {COUNTRIES.map((country) => (
            <li key={country.slug} className="group/submenu relative">
              <button className="flex w-full items-center justify-between rounded px-4 py-1.5 text-gray-800 hover:bg-indigo-50 hover:text-indigo-700">
                {country.name}
                <ChevronDown className="ml-2 h-3 w-3 text-gray-400" />
              </button>
              <div className="animate-fade-in invisible absolute top-0 left-full z-40 ml-2 min-w-[160px] rounded-xl border border-indigo-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover/submenu:visible group-hover/submenu:opacity-100">
                <ul className="py-2">
                  <li>
                    <a
                      href={`/abroad/${country.slug}/application`}
                      className="block rounded px-4 py-1.5 whitespace-nowrap text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      Application
                    </a>
                  </li>
                  <li>
                    <a
                      href={`/abroad/${country.slug}/visa-guidance`}
                      className="block rounded px-4 py-1.5 whitespace-nowrap text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      Visa Guidance
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
