import "./Display.css";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface DisplayProps {
  children: React.ReactNode;
  label: string;
}

function Display({ children, label }: DisplayProps) {
  const controls = useAnimation();
  useEffect(() => {
    // Trigger animation when children value changes
    controls.start({ opacity: 1, x: 0 });
  }, [children, controls]);
  return (
    <>
      <motion.h1
        className="display"
        layout
        initial={{ opacity: 0.5, x: 100 }}
        animate={controls}
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 0.1 },
        }}
        whileHover={{ scale: 1.05 }}
      >
        {Number.isNaN(children) || children === 0 ? (
          <span>--</span>
        ) : (
          <span>{children}</span>
        )}
        {label}
      </motion.h1>
    </>
  );
}

export default Display;
