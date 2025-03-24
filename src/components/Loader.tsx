import React from "react";
import { motion } from "framer-motion";

const SpinLoader: React.FC = () => {
  return (
    <motion.div
      className="w-8 h-8 border-4 border-t-transparent border-purple-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};

export default SpinLoader;
