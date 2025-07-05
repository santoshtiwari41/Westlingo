import React, { useState } from "react";

const TEST_TYPES = ["IELTS", "PTE", "SAT", "DUOLINGO", "NAT/JLPT"];

type FileMap = { [key: string]: File | undefined };

export default function LanguageProficiencyTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedType, setSelectedType] = useState(TEST_TYPES[0]);
  const [serverFiles, setServerFiles] = useState<FileMap>({});
  const [selectedFiles, setSelectedFiles] = useState<FileMap>({});
  const [backupFiles, setBackupFiles] = useState<FileMap>({});

  function handleFileChange(type: string, file: File | undefined) {
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
  }
  function handleClearFile(type: string) {
    setSelectedFiles((prev) => ({ ...prev, [type]: undefined }));
  }
  function handleEdit() {
    setBackupFiles(selectedFiles);
    setIsEditing(true);
  }
  function handleCancel() {
    setSelectedFiles(backupFiles);
    setIsEditing(false);
  }
  function handleSave() {
    console.log("Saving report card:", selectedFiles[selectedType]);
    setServerFiles((prev) => ({
      ...prev,
      [selectedType]: selectedFiles[selectedType],
    }));
    setIsEditing(false);
  }

  const file = selectedFiles[selectedType];
  const serverFile = serverFiles[selectedType];
  const isImage = file && file.type.startsWith("image/");
  let preview: React.ReactNode = null;
  if (isEditing && isImage) {
    preview = (
      <img
        src={URL.createObjectURL(file!)}
        alt="preview"
        className="ml-2 h-12 w-12 rounded border border-gray-300 object-cover select-none"
        style={{ pointerEvents: "none" }}
      />
    );
  } else if (!isEditing && serverFile && serverFile.type.startsWith("image/")) {
    preview = (
      <img
        src={URL.createObjectURL(serverFile)}
        alt="uploaded"
        className="ml-2 h-12 w-12 rounded border border-gray-300 object-cover select-none"
        style={{ pointerEvents: "none" }}
      />
    );
  } else if (!isEditing && serverFile) {
    preview = (
      <span className="ml-2 flex h-12 w-12 items-center justify-center rounded border border-gray-300 bg-gray-100">
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-gray-400"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
          <path
            d="M8 16l2-2 2 2 4-4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <div
      className="relative flex min-h-[calc(100vh-32px)] flex-col gap-4 rounded-xl border border-gray-300 bg-white px-8 pt-2 pb-8"
      style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.03)" }}
    >
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pt-4 pb-1">
        <h1 className="text-base font-medium tracking-tight text-gray-800">
          Language proficiency test
        </h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-medium text-indigo-500 hover:underline"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-4.243 1.415 1.415-4.243a4 4 0 01.94-1.414z"
              />
            </svg>
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="cursor-pointer rounded bg-indigo-500 px-4 py-1 text-xs font-medium text-white transition hover:bg-indigo-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="cursor-pointer rounded bg-gray-200 px-4 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <section className="rounded-lg border border-gray-300 bg-white p-4">
        <div className="flex flex-col gap-3 text-xs">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Test Type:</span>
            <select
              className="cursor-pointer appearance-none border-none bg-transparent text-xs font-semibold text-black focus:outline-none"
              value={selectedType}
              disabled={!isEditing}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ minWidth: 80 }}
            >
              {TEST_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              width="12"
              height="12"
              className="pointer-events-none ml-[-18px] text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                d="M6 8l4 4 4-4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 font-normal text-gray-600">Score</span>
            <span className="mr-1">:</span>
            <span className="font-semibold text-gray-800">N/A</span>
          </div>
          <div className="flex min-h-[40px] items-center gap-2">
            <span className="w-32 font-normal text-gray-600">Report Card</span>
            <span className="mr-1">:</span>
            <label className="relative inline-block">
              <input
                type="file"
                className="hidden"
                disabled={!isEditing}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(selectedType, e.target.files[0]);
                  }
                }}
              />
              <span
                className={`ml-0 cursor-pointer rounded-full border bg-gray-200 px-3 py-1 text-xs font-normal text-gray-700 lowercase transition ${file && isEditing ? "border-indigo-400 ring-2 ring-indigo-200" : "border-gray-200"} select-none ${isEditing ? "hover:bg-gray-300" : "cursor-not-allowed opacity-60"}`}
                style={{ fontSize: "12px" }}
              >
                upload
              </span>
            </label>
            {preview}
            {file && isEditing && (
              <span className="ml-2 flex items-center gap-1">
                <span className="max-w-[100px] truncate text-xs text-gray-700">
                  {file.name}
                </span>
                <button
                  type="button"
                  className="cursor-pointer rounded-full p-0.5 text-gray-400 hover:text-indigo-500"
                  onClick={() => handleClearFile(selectedType)}
                  title="Remove file"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 6l8 8M6 14L14 6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
