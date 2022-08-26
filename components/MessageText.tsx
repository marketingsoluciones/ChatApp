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
    <div className="md:flex lg:align-bottom lg:items-end lg:pb-2 pr-2 lg:pr-0">
      <div className=" md:max-w-lg">
        <p className={`${emisor ? "text-black " : "text-black "} break-words pl-2 pt-1 pr-2 pb-1 lg:pr-0 text-xs lg:text-sm`}>
          {message}
        </p>
      </div>
      {/* <div className=" "> */}
      <p className="text-right text-gray-700 text-xs lg:pl-2 pl-6 pr-1 lg:pr-6 lg:w-22 lg:h-2">
        {date}
      </p>
      {/* </div> */}
    </div>
    <style jsx>{`
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
