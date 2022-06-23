import { FC } from "react";
import { BellIcon } from "./icons";

export const Notification: FC = () => (
  <div className="flex items-center px-4 md:border-l md:border-r md:border-base h-full cursor-pointer">
    <span className="relative">
      <BellIcon className="w-6 h-6 text-gray-100" />
      <svg className="rounded-full bg-primary w-2 h-2 absolute top-0 right-0" />
    </span>
  </div>
);
