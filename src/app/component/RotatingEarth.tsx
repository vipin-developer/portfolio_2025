import React from "react";
import Image from "next/image";
// import EarthImage from "../public/A_digital_graphic_features_a_rotating_Earth_at_the.png"; // Adjust path if needed

const RotatingEarth = React.memo(() => (
  <div
    className="pointer-events-none select-none fixed left-1/2 top-1/2 z-10 rotating-earth"
    style={{
      transform: "translate(-50%, -50%)",
      opacity: 0.18,
      width: "720px",
      height: "720px",
    }}
  >
    <Image
      src="/earth.png"
      alt="Rotating Earth"
      layout="fill"
      objectFit="contain"
      priority
    />
    <style jsx>{`
      @media (max-width: 640px) {
        div.rotating-earth {
          width: 120px !important;
          height: 120px !important;
        }
      }
      .rotating-earth :global(img) {
        animation: spinEarth 20s linear infinite;
      }
      @keyframes spinEarth {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
));

export default RotatingEarth;