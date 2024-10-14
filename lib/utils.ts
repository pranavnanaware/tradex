import { clsx, type ClassValue } from "clsx"; // Import clsx and ClassValue type from clsx library
import { twMerge } from "tailwind-merge"; // Import twMerge from tailwind-merge library

// Function to merge class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
