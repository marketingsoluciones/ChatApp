import { FC } from "react";

export const Profile: FC = () => (
  <div className="flex items-center gap-2 cursor-pointer">
    <div className="rounded-full w-10 h-10 bg-tertiary object-cover object-center" />
    <span className="flex flex-col gap-1 text-left">
      <h2 className="truncate font-medium leading-tight text-sm text-black">
        Keanus Reeves
      </h2>
      <p className="truncate font-regular leading-tight text-xs text-gray-200">
        Frontend Enginner
      </p>
    </span>
  </div>
);