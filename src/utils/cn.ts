import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  const mrg = twMerge(clsx(inputs));
  return mrg;
}
