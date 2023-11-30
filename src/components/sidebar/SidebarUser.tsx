import Image from "next/image";
interface Props {
  user: { name: string; role: string };
}
export const SidebarUser = ({ user }: Props) => {
  return (
    <div className="mt-8 text-center">
      {/* Next/Image */}
      <Image
        src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
        alt="user- profile"
        width={200}
        height={200}
        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
      />
      <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
        {user.name}
      </h5>
      <span className="hidden text-gray-400 lg:block">{user.role}</span>
    </div>
  );
};
