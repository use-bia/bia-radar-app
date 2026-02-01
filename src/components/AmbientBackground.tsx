import { motion } from "framer-motion";

export const AmbientBackground = () => {
  return (
    <div className="absolute inset-0 w-full min-h-full overflow-hidden bg-[#000000] pointer-events-none">
      {/* 1. CLEAN NOISE OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
      />
      {/* Top Right - Emerald */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute -top-60 -right-60 w-200 h-200 md:-top-85 md:-right-85 xl:-top-130 xl:-right-130 md:w-250 md:h-250 lg:w-250 lg:h-250 xl:w-350 xl:h-350 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center in oklch, rgba(6, 78, 59, 0.4) 20%, rgba(10, 10, 10, 0) 70%)",
        }}
      />
      {/* Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="absolute -bottom-60 -left-60 w-200 h-200 md:-bottom-85 md:-left-85 xl:-bottom-130 xl:-left-130 md:w-250 md:h-250 lg:w-250 lg:h-250 xl:w-350 xl:h-350 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center in oklch, rgba(40, 40, 40, 0.5) 20%, rgba(10, 10, 10, 0) 70%)",
        }}
      />
    </div>
  );
};

// Moved out to keep the component clean
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;
