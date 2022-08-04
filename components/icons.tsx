import { FC } from "react";

interface propsIcon {
  className?: string;
  onClick?: VoidFunction
}

export const BellIcon: FC<propsIcon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        color="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

export const SearchIcon: FC<propsIcon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const CameraIcon: FC<propsIcon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export const MicIcon: FC<propsIcon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  );
};


export const PlusIcon: FC<propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}


export const SendIcon: FC<propsIcon> = (props) => {
  return (
    <svg width={281} height={281} viewBox="0 0 281 281" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M152.217 143.331L43.9441 161.386C42.6994 161.594 41.5312 162.126 40.5572 162.928C39.5831 163.731 38.8376 164.776 38.3954 165.958L1.06353 265.965C-2.50147 275.165 7.1154 283.933 15.9417 279.52L274.692 150.145C276.484 149.25 277.991 147.874 279.045 146.17C280.098 144.466 280.657 142.503 280.657 140.5C280.657 138.496 280.098 136.533 279.045 134.829C277.991 133.125 276.484 131.749 274.692 130.854L15.9417 1.4789C7.1154 -2.93422 -2.50147 5.8489 1.06353 15.0345L38.4098 115.041C38.8499 116.226 39.5945 117.274 40.5687 118.079C41.5429 118.884 42.7121 119.418 43.9585 119.627L152.231 137.668C152.897 137.784 153.501 138.132 153.936 138.65C154.371 139.168 154.61 139.823 154.61 140.5C154.61 141.176 154.371 141.831 153.936 142.349C153.501 142.867 152.897 143.215 152.231 143.331H152.217Z" fill="currentColor" />
    </svg>
  )
}

export const FileIcon: FC<propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="628.027" height="786.012" {...props}><defs><linearGradient id="a" x1=".5" x2=".5" y2={1} gradientUnits="objectBoundingBox"><stop offset={0} stopColor="#8a97ac" /><stop offset={1} stopColor="#5d6c83" /></linearGradient></defs><g data-name="Group 5"><path data-name="Union 2" d="M40 786a40 40 0 01-40-40V40A40 40 0 0140 0h461v103h29v24h98v619a40 40 0 01-40 40z" transform="translate(0 .012)" fill="url(#a)" /><path data-name="Intersection 2" d="M501.409 111.054l.058-109.9c31.605 29.739 125.37 125.377 125.37 125.377l-109.976.049a20.025 20.025 0 01-15.452-15.526z" fill="#bec8d9" stroke="#bec8d9" /></g></svg>
  )
}

export const DotsIcon: FC<propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  )
}


export const DownloadIcon: FC<propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}


export const UploadIcon: FC<propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  )
}

export const SubirImagenIcon: FC<propsIcon> = (props) => {
  return (
    <svg width={43} height={43} viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.9596 2.065C12.2719 1.44421 12.7505 0.922388 13.342 0.557755C13.9335 0.193122 14.6148 2.14342e-05 15.3096 0H24.7196C25.4164 2.35375e-05 26.0994 0.194181 26.692 0.560696C27.2846 0.92721 27.7634 1.45158 28.0746 2.075L29.5371 5H33.7621C35.4198 5 37.0095 5.65848 38.1816 6.83058C39.3537 8.00268 40.0121 9.5924 40.0121 11.25V20.6525C38.5902 19.4724 36.9443 18.5923 35.1733 18.0652C33.4023 17.538 31.5429 17.3747 29.7071 17.585C29.1122 15.2205 27.6742 13.1547 25.6635 11.7756C23.6528 10.3966 21.2078 9.79921 18.7877 10.0958C16.3676 10.3923 14.1391 11.5624 12.5209 13.3862C10.9027 15.2099 10.0061 17.5618 9.99965 20C9.99974 22.2324 10.7464 24.4006 12.1209 26.1596C13.4953 27.9187 15.4186 29.1675 17.5847 29.7075C17.2784 32.3877 17.7707 35.0986 18.9996 37.5H6.26465C4.60705 37.5 3.01733 36.8415 1.84523 35.6694C0.673129 34.4973 0.0146484 32.9076 0.0146484 31.25V11.25C0.0146484 9.5924 0.673129 8.00268 1.84523 6.83058C3.01733 5.65848 4.60705 5 6.26465 5H10.4896L11.9621 2.065H11.9596Z" fill="currentColor" />
      <path d="M19.9993 12.5C23.4818 12.5 26.4093 14.875 27.2543 18.09C25.0921 18.7488 23.1252 19.9294 21.5269 21.5277C19.9287 23.126 18.7481 25.0929 18.0893 27.255C16.3288 26.7888 14.798 25.6982 13.7824 24.1865C12.7667 22.6749 12.3356 20.8454 12.5694 19.0393C12.8032 17.2333 13.686 15.5739 15.053 14.3707C16.4201 13.1675 18.1781 12.5026 19.9993 12.5Z" fill="currentColor" />
      <path d="M42.5 31.25C42.5 34.2337 41.3147 37.0952 39.205 39.205C37.0952 41.3147 34.2337 42.5 31.25 42.5C28.2663 42.5 25.4048 41.3147 23.295 39.205C21.1853 37.0952 20 34.2337 20 31.25C20 28.2663 21.1853 25.4048 23.295 23.295C25.4048 21.1853 28.2663 20 31.25 20C34.2337 20 37.0952 21.1853 39.205 23.295C41.3147 25.4048 42.5 28.2663 42.5 31.25ZM32.5 26.25C32.5 25.9185 32.3683 25.6005 32.1339 25.3661C31.8995 25.1317 31.5815 25 31.25 25C30.9185 25 30.6005 25.1317 30.3661 25.3661C30.1317 25.6005 30 25.9185 30 26.25V30H26.25C25.9185 30 25.6005 30.1317 25.3661 30.3661C25.1317 30.6005 25 30.9185 25 31.25C25 31.5815 25.1317 31.8995 25.3661 32.1339C25.6005 32.3683 25.9185 32.5 26.25 32.5H30V36.25C30 36.5815 30.1317 36.8995 30.3661 37.1339C30.6005 37.3683 30.9185 37.5 31.25 37.5C31.5815 37.5 31.8995 37.3683 32.1339 37.1339C32.3683 36.8995 32.5 36.5815 32.5 36.25V32.5H36.25C36.5815 32.5 36.8995 32.3683 37.1339 32.1339C37.3683 31.8995 37.5 31.5815 37.5 31.25C37.5 30.9185 37.3683 30.6005 37.1339 30.3661C36.8995 30.1317 36.5815 30 36.25 30H32.5V26.25Z" fill="currentColor" />
    </svg>
  )
}
