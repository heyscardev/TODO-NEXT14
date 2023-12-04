"use client";
import { useState } from "react";
import { TabBarItem } from "./TabBarItem";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const defaultOptions: number[] = Array.from({ length: 4 }).map((v, i) => i + 1);
interface Props {
  initialSelected?: number;
  tabOptions?: number[];
}
export const TabBar = ({
  tabOptions = defaultOptions,
  initialSelected = 1,
}: Props) => {
  const [selected, setSelected] = useState<number>(initialSelected);
  const router = useRouter();
  const onTabSelect = (value: number) => {
    setSelected(Number(value));
    setCookie("tab", value.toString());
    router.refresh();
  };
  return (
    <div
      className={`grid w-full grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((v, i) => (
        <TabBarItem
          selected={selected === v}
          onSelect={() => onTabSelect(v)}
          label={`${v}`}
          key={v}
        />
      ))}
    </div>
  );
};
