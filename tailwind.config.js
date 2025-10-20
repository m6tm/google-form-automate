import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3b82f6", // blue-500
          "secondary": "#6b7280", // gray-500
          "accent": "#10b981", // emerald-500
          "neutral": "#374151", // gray-700
          "base-100": "#f3f4f6", // gray-100
          "base-200": "#e5e7eb", // gray-200
          "base-300": "#d1d5db", // gray-300
          "base-content": "#111827", // gray-900
          "info": "#06b6d4", // cyan-500
          "success": "#22c55e", // green-500
          "warning": "#f59e0b", // amber-500
          "error": "#ef4444", // red-500
        },
      },
    ],
  },
  plugins: [daisyui],
}
