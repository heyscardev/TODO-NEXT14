import { TabBar } from "@/components";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "Page odf cookies",
};
export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get("tab")?.value ?? 1;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-lg">
      <span className="text-3xl">Tabs</span>
      <TabBar initialSelected={+cookieTab} />
    </div>
  );
}
