"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import { useTRPC } from "@/trpc/client";

import OnboardingDocumentsStep from "./OnboardingDocumentsStep";
import OnboardingEducationStep from "./OnboardingEducationStep";
import OnboardingPersonalStep from "./OnboardingPersonalStep";

const steps = [
  {
    label: "Personal Information",
    key: "personal",
    Component: OnboardingPersonalStep,
  },
  { label: "Academics", key: "education", Component: OnboardingEducationStep },
  {
    label: "General Documents",
    key: "documents",
    Component: OnboardingDocumentsStep,
  },
];

type StepKey = (typeof steps)[number]["key"];

export default function OnboardingStepper() {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const trpc = useTRPC();
  const { data: profileData } = useSuspenseQuery(
    trpc.users.getProfile.queryOptions()
  );
  useEffect(() => {
    if (step === steps.length) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step]);
  const personalMutation = useMutation(
    trpc.users.createPersonalInfo.mutationOptions({})
  );
  const educationMutation = useMutation(
    trpc.users.createEducationalInfo.mutationOptions({})
  );

  const handleContinue = async (key: StepKey, values: any) => {
    setIsTransitioning(true);
    setError(null);
    try {
      if (key === "personal") {
        await new Promise((resolve, reject) =>
          personalMutation.mutate(values, {
            onSuccess: resolve,
            onError: reject,
          })
        );
      } else if (key === "education") {
        await new Promise((resolve, reject) =>
          educationMutation.mutate(
            { education: values },
            { onSuccess: resolve, onError: reject }
          )
        );
      }
      setStep((s) => s + 1);
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setIsTransitioning(false);
    }, 400);
  };

  const CurrentStep = steps[step]?.Component;
  const stepKey = steps[step]?.key;

  const getInitialValues = (key: StepKey) => {
    if (key === "personal") {
      const p = profileData?.profile || {};
      return {
        firstName: p.firstName ?? "",
        middleName: p.middleName ?? "",
        lastName: p.lastName ?? "",
        phoneNumber: p.phoneNumber ?? "",
        dob: p.dob ? new Date(p.dob) : new Date(),
        permanentAddress: p.permanentAddress ?? "",
        temporaryAddress: p.temporaryAddress ?? "",
      };
    }
    if (key === "education") return profileData?.education || [];
    if (key === "documents") return profileData?.documents || [];
    return undefined;
  };

  return (
    <>
      <div className="mx-auto mb-8 flex w-full max-w-screen-lg items-center justify-between px-4 pt-5">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className="relative flex min-w-[110px] flex-1 flex-col items-center"
          >
            {/* Step circle and progress line */}
            <div className="flex w-full flex-col items-center">
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${i <= step ? "border-purple-600 bg-purple-600 text-white" : "border-gray-300 bg-gray-200 text-gray-500"} `}
              >
                {i < step ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="font-bold">{i + 1}</span>
                )}
              </div>
              {/* Step label below the circle, always centered */}
              <span
                className={`mt-2 block w-full text-center text-xs ${i === step ? "font-semibold text-purple-700" : "text-gray-500"}`}
              >
                {s.label}
              </span>
            </div>
            {/* Progress line (drawn behind the circle, horizontally) */}
            {i < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 h-1 w-full ${i < step ? "bg-purple-600" : "bg-gray-300"}`}
                style={{ zIndex: 0, right: "-50%", left: "50%" }}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-2xl py-8">
        <div className="min-h-[350px] rounded-lg bg-white p-6 shadow">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {step < steps.length && CurrentStep && (
                <CurrentStep
                  initialValues={getInitialValues(stepKey)}
                  onContinue={(values: any) => handleContinue(stepKey, values)}
                  onBack={step > 0 ? handleBack : undefined}
                  isLoading={isTransitioning}
                />
              )}
              {error && (
                <div className="mt-2 text-sm text-red-500">{error}</div>
              )}
              {step === steps.length && (
                <motion.div
                  className="flex h-64 flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-4 h-20 w-20 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                  <motion.p
                    className="text-xl font-semibold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Onboarding Complete!
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
