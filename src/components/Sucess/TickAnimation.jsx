import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import bloop from '../../assets/sound/bloop.mp3';

export default function TickAnimation({ size = 30, strokeColor = "#000000" }) {
  const controls = useAnimation();
  const audioRef = useRef(null);

  useEffect(() => {
    async function startAnimation() {
      // Start the path animation
      controls.start({ pathLength: 1, transition: { duration: 0.6 } });

      // Trigger vibration (if supported)
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      // Play sound
      try {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        }
      } catch (error) {
        console.warn("Error playing sound", error);
      }
    }

    startAnimation();
  }, [controls]);

  return (
    <div>
      {/* Hidden audio element */}
<audio ref={audioRef} src={bloop} preload="auto" />

      {/* Tick animation */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        stroke={strokeColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M14 27 L22 35 L38 19"
          initial={{ pathLength: 0 }}
          animate={controls}
        />
      </svg>
    </div>
  );
}
