"use client";

import { useState } from "react";

import { Calendar } from "lucide-react";

export default function DatePicker() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex w-full cursor-pointer items-center rounded border bg-white px-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="mr-2 text-gray-500" size={18} />
        <input
          type="text"
          className="w-full cursor-pointer p-2 outline-none"
          value={""}
          readOnly
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-1 w-full rounded border bg-white p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 font-medium">Check-in</h3>
              <div className="space-y-2">
                <button className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">
                  Tue 24 Jun
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">
                  Wed 25 Jun
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">
                  Thu 26 Jun
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Check-out</h3>
              <div className="space-y-2">
                <button className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">
                  Wed 25 Jun
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">
                  Thu 26 Jun
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">
                  Fri 27 Jun
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
