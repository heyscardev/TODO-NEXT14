"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  title: string;
  href: string;
}
export const SidebarItem = ({ href, icon, title }: Props) => {
  const path = usePathname();
  const active = path === href;
  const className = active
    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group";
  const titleClassName = active
    ? "-mr-1 font-medium"
    : "group-hover:text-gray-700";
  return (
    <li>
      <Link href={href} className={className}>
        {icon}
        <span className={titleClassName}>{title}</span>
      </Link>
    </li>
  );
};
