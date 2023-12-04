import React from "react";
interface Props {
  title?: string;
  children?: React.ReactNode;
  subtitle?: string;
  labelValue?: string | number;
}
export const WidgetItem = ({
  children,
  title,
  subtitle,
  labelValue,
}: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div className=" flex flex-col justify-center text-center gap-4">
          {!!title && (
            <h5 className="text-xl text-gray-600 text-center">{title}</h5>
          )}

          {children ?? (
            <div className="mt-2 flex  justify-center gap-4">
              {labelValue && (
                <h3 className="text-6xl font-bold text-cyan-600">
                  {labelValue}
                </h3>
              )}
            </div>
          )}

          {subtitle && (
            <span className="block text-center text-gray-500">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
};
