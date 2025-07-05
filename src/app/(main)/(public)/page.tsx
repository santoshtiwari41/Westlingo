"use client";

import CustomContainer from "@/components/common/custom-container";
import HomeContainer from "@/components/home/Home";

export default function Home() {
  return (
    <CustomContainer className="divide-y-2 bg-gray-50">
      <HomeContainer />
    </CustomContainer>
  );
}
