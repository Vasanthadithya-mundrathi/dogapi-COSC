# Dog Image Viewer

A modern React app to browse random dog images using the [Dog CEO API](https://dog.ceo/dog-api/).

---

## How Dog Images Are Fetched

This app fetches random dog images from the public Dog CEO API:

- **API Endpoint Used:**  
  `https://dog.ceo/api/breeds/image/random`
- **How It Works:**  
  When you load the app or click a button (e.g., "Next Dog"), the app sends a GET request to the above endpoint. The API responds with a JSON object containing a URL to a random dog image.
- **Example Response:**
  ```json
  {
    "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
    "status": "success"
  }
  ```
- **Usage in the App:**  
  The app uses `fetch` (or `axios`) in a React component (usually in `useEffect` or a button handler) to get the image URL, then displays it in an `<img>` tag.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended, or use npm/yarn)

### Installation

```bash
git clone https://github.com/Vasanthadithya-mundrathi/dogapi-COSC.git
cd dogapi-COSC
pnpm install
```

### Running the App

```bash
pnpm run dev --host
```

- Open the URL shown in your terminal (e.g., http://localhost:5173 or http://localhost:5175) in your browser.

### Building for Production

```bash
pnpm run build
```

---

## Project Structure

```
dog-image-viewer/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   └── main.jsx           # Entry point
├── dist/                  # Production build output
├── package.json           # Project metadata and scripts
├── pnpm-lock.yaml         # Lockfile
├── README.md              # This file
└── .gitignore             # Git ignore rules
```

---

## Credits

- [Dog CEO API](https://dog.ceo/dog-api/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

## License

MIT License
