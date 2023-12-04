"use client";

import Image from "next/image";

import { IoAddCircleOutline, IoRemove } from "react-icons/io5";
import { addProductToCart, removeProductFromCart } from "../actions/actions";

import { useRouter } from "next/navigation";
import { Product } from "@/products/data/product";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCart = ({ product, quantity }: Props) => {
  const router = useRouter();

  function onAddToCart() {
    addProductToCart(product.id);
    router.refresh();
  }

  function onRemoveItem() {
    removeProductFromCart(product.id);
    router.refresh();
  }

  return (
    <div className="flex items-center  rounded-lg w-full bg-white border-s-4 dark:bg-slate-500 border-cyan-300 dark:border-cyan-600 shadow-lg">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5 w-full flex flex-col mt-2">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight text-cyan-800 dark:text-white">
            {product.name} -{" "}
            <small className="text-sm">${product.price.toFixed(2)}</small>
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-gray-900 dark:text-white">
            Cantidad: {quantity}
          </span>
          <span className="font-bold text-cyan-500">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex p-5 items-center justify-center">
        <button
          onClick={onAddToCart}
          className="text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-sky-500 hover:to-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-black   dark:shadow-white focus:shadow-lg"
        >
          <IoAddCircleOutline size={25} />
        </button>
        <span className=" text-2xl text-slate-700 min-w-[30px] text-center mx-10">
          {quantity}
        </span>
        <button
          onClick={onRemoveItem}
          className="text-white bg-gradient-to-r transition-all from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 focus:shadow-lg dark:shadow-white  shadow-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          <IoRemove size={25} />
        </button>
      </div>
    </div>
  );
};
