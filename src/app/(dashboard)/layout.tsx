// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, TopMenu } from "@/components";
import { CiBellOn, CiChat1, CiMenuBurger, CiSearch } from "react-icons/ci";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <div className="ml-auto  lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 pt-6 pb-8 ">{children}</div>
      </div>
    </>
  );
}
