import { cookies } from "next/headers";
import Link from "next/link";
import {
  CiBellOn,
  CiChat1,
  CiMenuBurger,
  CiSearch,
  CiShoppingBasket,
} from "react-icons/ci";

export const TopMenu = () => {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const total = Object.values(cart).reduce(
    (prev: number, current: any): number =>
      isNaN(+current) ? prev : prev + +current,
    0
  );
  return (
    <div className=" dark:bg-slate-600 sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5
          hidden
          className="text-2xl text-gray-600 dark:text-white font-medium lg:block"
        >
          Dashboard
        </h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">
          <div hidden className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Search here"
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
              />
            </div>
          </div>

          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
            <CiSearch />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            <CiChat1 size={25} />
          </button>
          <Link
            href="/cart"
            className=" p-2 relative flex items-center justify-center  h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
          >
            {!!total && (
              <span className="text-[10px] absolute -top-2 -right-3 bg-cyan-500 aspect-square w-5 h-5 flex justify-center items-center rounded-full text-neutral-900 font-bold mr-1">
                {total}
              </span>
            )}
            <CiShoppingBasket size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};
