export const motionDurations = {
  fast: 0.2,
  standard: 0.24,
  deliberate: 0.28,
} as const;

export const motionEasing = [0.16, 1, 0.3, 1] as const;

export const dropdownMotion = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: motionDurations.standard, ease: motionEasing },
} as const;

export const reducedDropdownMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.08 },
} as const;

export const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: motionDurations.standard, ease: motionEasing },
} as const;

export const dialogMotion = {
  initial: { opacity: 0, scale: 0.98, x: "-50%", y: "-50%" },
  animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
  exit: { opacity: 0, scale: 0.98, x: "-50%", y: "-50%" },
  transition: { duration: motionDurations.standard, ease: motionEasing },
} as const;

export function sheetMotion(side: "left" | "right") {
  const offset = side === "left" ? "-100%" : "100%";
  return {
    initial: { opacity: 0, x: offset },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: offset },
    transition: { duration: 0.26, ease: motionEasing },
  } as const;
}

export const reducedSurfaceMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.08 },
} as const;

export const reducedDialogMotion = {
  initial: { opacity: 0, x: "-50%", y: "-50%" },
  animate: { opacity: 1, x: "-50%", y: "-50%" },
  exit: { opacity: 0, x: "-50%", y: "-50%" },
  transition: { duration: 0.08 },
} as const;
