import { FC, MouseEventHandler } from "react";
import { BellIcon } from "./icons";
import { LedIndicator } from "./LedIndicator"

interface propsMesageTetx {
  message: any;
  date: string;
  emisor?: boolean;
}

export const MessageText: FC<propsMesageTetx> = ({ message, date, emisor }) => (
  <>
    <div className="lg:flex lg:align-bottom lg:items-end lg:pb-2 pr-2 lg:pr-0">
      <div className="maxWText lg:max-w-lg">
        <p className={`${emisor ? "text-black " : "text-black "} break-words maxWText pl-2 pt-1 pr-2 lg:pr-0 text-xs lg:text-sm`}>
          {message}
        </p>
      </div>
      {/* <div className=" "> */}
      <p className="maxWText text-right text-gray-200 text-xs lg:pl-2 pr-3 lg:pr-6 lg:w-22 lg:h-2">
        {date}
      </p>
      {/* </div> */}
    </div>
    <style>{`
    @media screen and (max-width: 767px){
        .maxWText {
          width: 230px;
          //overflow: scroll;
          font-size: 10px
        }
      } 
    `}</style>
  </>
);
