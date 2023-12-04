import { SidebarUser, WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboardpage = async () => {
  const cookiesCart = JSON.parse(cookies().get("cart")?.value ?? "{}");
  const totalPoducts: number = Object.values(cookiesCart).reduce(
    (prev: number, total: any) => prev + total,
    0
  );
  const session = await getServerSession();
  if (!session) redirect("/api/auth/signin");
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem
        title={
          session?.user ? "User Conected Server Side" : "No User Autenticated"
        }
      >
        <div className="flex flex-col  justify-center my-1  w-100">
          {session?.user ? (
            <SidebarUser
              name={session?.user?.name}
              image={session?.user?.image || undefined}
              role={session?.user?.email || "admin"}
            />
          ) : (
            <Link
              className="bg-gradient-to-r from-cyan-400 to-blue-600 p-2 text-white rounded-lg hover:shadow-lg shadow-black"
              href="/api/auth/signin"
            >
              Sig In
            </Link>
          )}
        </div>
      </WidgetItem>
      <WidgetItem
        title="Total products in cart"
        labelValue={totalPoducts}
        subtitle="products to buy in shopping cart"
      />
    </div>
  );
};

export default Dashboardpage;
