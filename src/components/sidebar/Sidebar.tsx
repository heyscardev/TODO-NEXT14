import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
} from "react-icons/io5";

import { SidebarBanner, SidebarItem, SidebarUser } from "..";
import { CiLogout } from "react-icons/ci";

interface Item {
  icon: React.ReactNode;
  title: string;
  href: string;
}
const items: Item[] = [
  {
    href: "/",
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
  },
  {
    href: "/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
    title: "Rest Todos",
  },
  {
    href: "/server-todos",
    icon: <IoListOutline size={30} />,
    title: "Server Actions",
  },
];
export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <SidebarBanner />
        <SidebarUser user={{ name: "Heyscar Romero", role: "Admin" }} />
        <ul className="space-y-2 tracking-wide mt-8">
          {items.map((item) => (
            <SidebarItem {...item} key={item.href} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
