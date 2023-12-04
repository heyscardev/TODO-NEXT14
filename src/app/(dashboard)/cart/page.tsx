import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/product";
import { ItemCart } from "@/shopping-cart";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Admin Shopping Cart view",
};
interface CartItem {
  [id: string]: number;
}
interface ProductInCart {
  product: Product;
  quantity: number;
}
const getProductsInCart = (cart: CartItem): ProductInCart[] => {
  const ProductsInCart: ProductInCart[] = [];
  products.forEach((product) => {
    if (cart[product.id])
      ProductsInCart.push({ product, quantity: cart[product.id] });
  });
  return ProductsInCart;
};
export default function CartPage() {
  const cookiesCart = JSON.parse(cookies().get("cart")?.value ?? "{}");
  const productsInCart = getProductsInCart(cookiesCart);
  const taxes = 15;
  const total = productsInCart.reduce(
    (prev, curr) => prev + curr.product.price * curr.quantity,
    0
  );
  const totalTaxes = (total * taxes) / 100;
  return (
    <div className="   flex flex-col items-start">
      <h1 className=" text-4xl ms-2 font-medium border-b-[3px] border-b-slate-400 pr-8 pb-2 bg-gradient-to-b w-auto from-gray-400 drop-shadow-lg  to-slate-500 inline-block text-transparent bg-clip-text">
        Products In Cart
      </h1>
      <hr className="mb-4" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCart product={product} quantity={quantity} key={product.id} />
          ))}
        </div>
        <div className="w-full sm:w-4/12 ">
          <WidgetItem title="Total to pay:">
            <div className="mt-2 flex  justify-center gap-4">
              <h3 className="text-4xl font-bold text-gray-700 ">${total}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Taxes {taxes}% ${totalTaxes.toFixed(2)}
            </span>
            <div className=" flex  justify-center">
              <h4 className="text-3xl  font-semibold  text-right   text-slate-600">
                Total:{" "}
                <span className="text-cyan-600">
                  ${(total + totalTaxes).toFixed(2)}
                </span>
              </h4>
            </div>
          </WidgetItem>
          {/* <h4 className="text-4xl mt-4 border-b-2  border-cyan-500 text-slate-600">
            Total: <span className="text-cyan-500">${total.toFixed(2)}</span>
          </h4> */}
        </div>
      </div>
    </div>
  );
}
