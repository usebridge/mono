import * as React from "react";
import type { SVGProps } from "react";

export function LogoDark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="888"
      height="888"
      viewBox="0 0 888 888"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_1_3"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="888"
        height="888"
      >
        <rect width="888" height="888" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_1_3)">
        <path
          d="M0 197C0 87.6476 88.6476 -1 198 -1H690C799.352 -1 888 87.6476 888 197V689C888 798.352 799.352 887 690 887H198C88.6476 887 0 798.352 0 689V197Z"
          fill="url(#paint0_linear_1_3)"
        />
        <path
          d="M444 664C302.148 664 219 565.279 219 443.5C219 321.721 302.148 223 444 223"
          stroke="url(#paint1_linear_1_3)"
          stroke-width="90"
        />
        <path
          d="M444 223C585.852 223 669 321.721 669 443.5C669 565.279 585.852 664 444 664"
          stroke="url(#paint2_linear_1_3)"
          stroke-width="90"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_3"
          x1="-1.32322e-05"
          y1="887"
          x2="811.894"
          y2="-65.8478"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0397885" stop-color="#1D1D1D" />
          <stop offset="0.49957" stop-color="#1D1D1D" />
          <stop offset="0.909524" stop-color="#1D1D1D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_3"
          x1="331.5"
          y1="223"
          x2="332"
          y2="760.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.244792" stop-color="#10A6A6" />
          <stop offset="1" stop-color="#10A6A6" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_3"
          x1="556.5"
          y1="664"
          x2="556"
          y2="126.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.244792" stop-color="#10A6A6" />
          <stop offset="1" stop-color="#10A6A6" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
