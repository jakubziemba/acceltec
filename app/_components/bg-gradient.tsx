export default function BackgroundGradient() {
  return (
    <div className="fixed left-0 top-0 isolate -z-10 h-full w-full mix-blend-difference">
      {/* <div
        className="absolute right-0 top-0 h-[806px] w-[1100px]"
        style={{
          background: `linear-gradient(272.39deg, rgba(255, 255, 255, 0.04) 19.21%, rgba(153, 153, 153, 0.02) 58.58%);`,
        }}
      ></div> */}
      <svg
        width={1826}
        height={1607}
        viewBox="0 0 1826 1607"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-0 h-[806px] w-[1100px]"
      >
        <g filter="url(#filter0_f_61_21)">
          <path
            d="M819.898 804.5C819.898 909.71 197.226 1204 468.398 1204C603.825 1204 1114.7 1227.83 1311.4 1135C1508.56 1041.95 1391.4 832.167 1391.4 779.5C1391.4 674.29 1059.07 400 787.898 400C516.726 400 819.898 699.29 819.898 804.5Z"
            fill="url(#paint0_linear_61_21)"
            fillOpacity={0.08}
            style={{}}
          />
        </g>
        <defs>
          <filter
            id="filter0_f_61_21"
            x={-0.000488281}
            y={0}
            width={1825.95}
            height={1606.74}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={200}
              result="effect1_foregroundBlur_61_21"
            />
          </filter>
          <linearGradient
            id="paint0_linear_61_21"
            x1={437}
            y1={942.243}
            x2={1010.5}
            y2={911.743}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset={0.268253}
              stopColor="white"
              style={{
                stopColor: "white",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              stopColor="#999999"
              style={{
                stopColor: "#999999",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
