"use client"
import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const SyncSpaceLogo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#6A00F4", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#00D2FF", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#FF0080", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#grad1)" />
        <path
          d="M 70 100 Q 100 70 130 100 T 170 100"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{ transform: "rotate(180deg)", transformOrigin: "center" }}
        />
        <path
          d="M 70 100 Q 100 130 130 100 T 170 100"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </motion.svg>
      <div style={{ marginLeft: "10px" }}>
        <AnimatedText text="Sync Space" /> {/* Use the AnimatedText component */}
      </div>
    </div>
  );
};

export default SyncSpaceLogo;
