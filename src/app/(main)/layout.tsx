"use client";

import { Provider } from "react-redux";

import { Footer } from "@/components/global/footer";
import SiteHeader from "@/components/global/navigation";
import { store } from "@/store/store";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Provider>
  );
}
