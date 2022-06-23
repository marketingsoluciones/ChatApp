import { FC } from "react";

interface propsLedIndicator {
  valir?: boolean;
  value: number | undefined | null
}

export const LedIndicator: FC<propsLedIndicator> = ({ valir, value }) => (
  <>
    {
      valir && <div>
        <svg className="rounded-full bg-primary w-4 h-4 absolute top-0 left-4" />
        <span className="text-sm absolute top-0 left-4">
          {value}
        </span>
      </div>
    }
  </>
);
