# Google Form Automate Extension

A browser extension built with React, Tailwind CSS, and Lucide icons to automate Google Forms.

## Setup

1. Install dependencies: `pnpm install`
2. Build the extension: `pnpm run build`
3. Load the `dist` folder as an unpacked extension in your browser (Chrome: chrome://extensions/, Firefox: about:addons)

## Development

Run `pnpm run dev` to start the development server.

## Structure

- `src/`: React source code
- `popup.html`: Popup interface
- `content.js`: Content script for Google Forms pages
- `manifest.json`: Extension manifest

## Technologies

- React
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)
