import Image from "next/image";
import Link from "next/link";

export const SidebarBanner = () => {
  return (
    <div className="-mx-6 px-6 py-4">
      {/* TODO: Next/Link hacia dashboard */}
      <Link href="/" title="Dashboard">
        {/* Next/Image */}
        <Image
          src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
          className="w-32"
          height={40}
          width={80}
          alt="tailus logo"
        />
      </Link>
    </div>
  );
};
