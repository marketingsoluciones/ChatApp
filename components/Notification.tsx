import { FC, MouseEventHandler } from "react";
import { BellIcon } from "./icons";
import { LedIndicator } from "./LedIndicator"

interface propsNotication {
  valir?: boolean;
  value?: number | undefined | null
  onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const Notification: FC<propsNotication> = ({ valir, value, onClick }) => (
  <>
    <div className="flex items-center px-4 md:border-l md:border-r md:border-base h-full cursor-pointer" onClick={onClick}>
      <span className="relative">
        <BellIcon className="w-6 h-6 text-gray-100" />
        <LedIndicator valir={valir} value={value} />
      </span>
    </div>
  </>
);
