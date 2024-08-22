"use client"
import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
    text: string;
}

const AnimatedText : React.FC<AnimatedTextProps> = ({ text }) => {
  return (
    <motion.div
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
      animate={{
        color: ["#6A00F4", "#00D2FF", "#FF0080", "#FF8C00"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedText;
