import Image from "next/image";
import profile from "@/assets/user.jpeg";
interface Props {
  name?: string | null;
  role: string;
  image?: string | null;
}
export const SidebarUser = ({ image, name, role }: Props) => {
  return (
    <div className="mt-8 text-center">
      {/* Next/Image */}
      <Image
        src={image ?? profile}
        alt={`${name} - profile`}
        width={200}
        height={200}
        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28  border-cyan-400 border-y-1 border-x-8 "
        priority
      />
      <h5 className="hidden dark:text-cyan-300 mt-4 text-xl font-semibold text-gray-600 lg:block">
        {name}
      </h5>
      <span className="hidden text-gray-400 dark:text-white lg:block">
        {role}
      </span>
    </div>
  );
};
