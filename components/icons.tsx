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

export const MicIcon : FC<propsIcon> = (props) => {
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


export const PlusIcon : FC<propsIcon> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
</svg>
    )
}


export const SendIcon : FC<propsIcon> = (props) => {
    return (
        <svg width={281} height={281} viewBox="0 0 281 281" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M152.217 143.331L43.9441 161.386C42.6994 161.594 41.5312 162.126 40.5572 162.928C39.5831 163.731 38.8376 164.776 38.3954 165.958L1.06353 265.965C-2.50147 275.165 7.1154 283.933 15.9417 279.52L274.692 150.145C276.484 149.25 277.991 147.874 279.045 146.17C280.098 144.466 280.657 142.503 280.657 140.5C280.657 138.496 280.098 136.533 279.045 134.829C277.991 133.125 276.484 131.749 274.692 130.854L15.9417 1.4789C7.1154 -2.93422 -2.50147 5.8489 1.06353 15.0345L38.4098 115.041C38.8499 116.226 39.5945 117.274 40.5687 118.079C41.5429 118.884 42.7121 119.418 43.9585 119.627L152.231 137.668C152.897 137.784 153.501 138.132 153.936 138.65C154.371 139.168 154.61 139.823 154.61 140.5C154.61 141.176 154.371 141.831 153.936 142.349C153.501 142.867 152.897 143.215 152.231 143.331H152.217Z" fill="currentColor" />
      </svg>
    )
}

export const FileIcon : FC <propsIcon> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="628.027" height="786.012" {...props}><defs><linearGradient id="a" x1=".5" x2=".5" y2={1} gradientUnits="objectBoundingBox"><stop offset={0} stopColor="#8a97ac" /><stop offset={1} stopColor="#5d6c83" /></linearGradient></defs><g data-name="Group 5"><path data-name="Union 2" d="M40 786a40 40 0 01-40-40V40A40 40 0 0140 0h461v103h29v24h98v619a40 40 0 01-40 40z" transform="translate(0 .012)" fill="url(#a)" /><path data-name="Intersection 2" d="M501.409 111.054l.058-109.9c31.605 29.739 125.37 125.377 125.37 125.377l-109.976.049a20.025 20.025 0 01-15.452-15.526z" fill="#bec8d9" stroke="#bec8d9" /></g></svg>
    )
}

export const DotsIcon : FC <propsIcon> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
</svg>
    )
}


export const DownloadIcon : FC <propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
</svg>
  )
}


export const UploadIcon : FC <propsIcon> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
</svg>
  )
}
