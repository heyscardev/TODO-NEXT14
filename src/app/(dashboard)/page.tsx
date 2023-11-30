import { WidgetItem } from "@/components";
import React from "react";

const Dashboardpage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem />
      <WidgetItem />
      <WidgetItem />
      <WidgetItem />
    </div>
  );
};

export default Dashboardpage;
