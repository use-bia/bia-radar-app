import { motion } from "framer-motion";

export const AmbientBackground = () => {
  return (
    <div className="absolute inset-0 w-full min-h-full overflow-hidden bg-background pointer-events-none">
      {/* 1. CLEAN NOISE OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
      />

      {/* 2. Top Right - Emerald/Green */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        // Added: blur-[100px] and translate-z-0
        className="absolute -top-60 -right-60 w-200 h-200 md:-top-85 md:-right-85 xl:-top-130 xl:-right-130 md:w-250 md:h-250 lg:w-250 lg:h-250 xl:w-350 xl:h-350 rounded-full 
        [--green-alpha:90%] dark:[--green-alpha:89%]
        blur-[100px] translate-z-0"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--accent), transparent var(--green-alpha)) 0%, transparent 70%)",
        }}
      />

      {/* 3. Bottom Left - Greyish */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.2 }}
        // Added: blur-[100px] and translate-z-0
        className="absolute -bottom-60 -left-60 w-200 h-200 md:-bottom-85 md:-left-85 xl:-bottom-150 xl:-left-150 md:w-250 md:h-250 lg:w-250 lg:h-250 xl:w-350 xl:h-350 rounded-full
        [--grey-alpha:90%] dark:[--grey-alpha:93%]
        blur-[100px] translate-z-0"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--foreground), transparent var(--grey-alpha)) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;
