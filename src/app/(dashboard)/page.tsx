import { WidgetItem } from "@/components";
import { cookies } from "next/headers";
import React from "react";

const Dashboardpage = () => {
  const cookiesCart = JSON.parse(cookies().get("cart")?.value ?? "{}");
  const totalPoducts: number = Object.values(cookiesCart).reduce(
    (prev: number, total: any) => prev + total,
    0
  );
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem
        title="Total products in cart"
        labelValue={totalPoducts}
        subtitle="products to buy in shopping cart"
      />
    </div>
  );
};

export default Dashboardpage;
