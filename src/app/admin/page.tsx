import { headers } from "next/headers";
import { redirect } from "next/navigation";

import CustomContainer from "@/components/common/custom-container";
import { auth } from "@/lib/auth";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <CustomContainer>page</CustomContainer>;
};

export default page;
