import React from "react";

function Icon({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
    >
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#cbd5e0" transform="translate(-464 -1087)">
            <path d="M480 1117c-7.732 0-14-6.27-14-14s6.268-14 14-14 14 6.27 14 14-6.268 14-14 14zm0-30c-8.837 0-16 7.16-16 16s7.163 16 16 16 16-7.16 16-16-7.163-16-16-16zm6 15h-5v-5a1.001 1.001 0 00-2 0v5h-5a1.001 1.001 0 000 2h5v5a1.001 1.001 0 002 0v-5h5a1.001 1.001 0 000-2z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
